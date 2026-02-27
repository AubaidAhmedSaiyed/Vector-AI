const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
dotenv.config({ path: path.join(__dirname, '.env') });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const os = require('os');

const Inventory = require('./models/Inventory');

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('MONGO_URI is missing. Add it in backend/.env');
  process.exit(1);
}

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`[Route Hit] ${req.method} ${req.originalUrl}`);
  next();
});

app.get('/', (req, res) => {
  res.send('Vector-AI Backend Running');
});

app.get('/api', (req, res) => {
  res.json({
    message: 'API is working',
    status: 'success'
  });
});

const uploadsDir = process.env.UPLOAD_DIR
  || (process.env.NODE_ENV === 'production' ? os.tmpdir() : path.join(__dirname, 'uploads'));
if (uploadsDir !== os.tmpdir() && !fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const upload = multer({
  dest: uploadsDir,
  limits: { fileSize: Number(process.env.MAX_CSV_SIZE_BYTES) || 10 * 1024 * 1024 }
});

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const parseNumber = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const buildInventoryPayload = (input, partial = false) => {
  const payload = {};

  if (!partial || Object.prototype.hasOwnProperty.call(input, 'name')) {
    payload.name = input.name;
  }
  if (!partial || Object.prototype.hasOwnProperty.call(input, 'sku')) {
    payload.sku = input.sku;
  }
  if (!partial || Object.prototype.hasOwnProperty.call(input, 'quantity')) {
    payload.quantity = parseNumber(input.quantity, 0);
  }
  if (!partial || Object.prototype.hasOwnProperty.call(input, 'price')) {
    payload.price = parseNumber(input.price, 0);
  }
  if (!partial || Object.prototype.hasOwnProperty.call(input, 'category')) {
    payload.category = input.category || '';
  }

  return payload;
};

const validateObjectIdParam = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid Mongo ObjectId' });
  }

  return next();
};

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/inventory', asyncHandler(async (req, res) => {
  const items = await Inventory.find().sort({ createdAt: -1 }).lean();
  res.json(items);
}));

app.get('/api/inventory/:id', validateObjectIdParam, asyncHandler(async (req, res) => {
  const item = await Inventory.findById(req.params.id).lean();
  if (!item) {
    return res.status(404).json({ message: 'Inventory item not found' });
  }

  return res.json(item);
}));

app.post('/api/inventory', asyncHandler(async (req, res) => {
  const payload = buildInventoryPayload(req.body);

  const created = await Inventory.create(payload);
  console.log(`[Records Inserted] inventory=1 sku=${created.sku}`);
  res.status(201).json(created);
}));

app.put('/api/inventory/:id', validateObjectIdParam, asyncHandler(async (req, res) => {
  const payload = buildInventoryPayload(req.body, true);

  const updated = await Inventory.findByIdAndUpdate(
    req.params.id,
    payload,
    { new: true, runValidators: true }
  );

  if (!updated) {
    return res.status(404).json({ message: 'Inventory item not found' });
  }

  return res.json(updated);
}));

app.delete('/api/inventory/:id', validateObjectIdParam, asyncHandler(async (req, res) => {
  const deleted = await Inventory.findByIdAndDelete(req.params.id);
  if (!deleted) {
    return res.status(404).json({ message: 'Inventory item not found' });
  }

  return res.json({ message: 'Inventory item deleted' });
}));

app.post('/api/upload-csv', upload.single('file'), asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'CSV file is required (field: file)' });
  }

  const parsedRows = [];

  try {
    await new Promise((resolve, reject) => {
      fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (row) => parsedRows.push(row))
        .on('end', resolve)
        .on('error', reject);
    });

    const docs = parsedRows
      .map((row) => ({
        name: String(row.name || '').trim(),
        sku: String(row.sku || '').trim(),
        quantity: parseNumber(row.quantity, 0),
        price: parseNumber(row.price, 0),
        category: String(row.category || '').trim()
      }))
      .filter((doc) => doc.name && doc.sku);

    if (docs.length === 0) {
      return res.status(400).json({ message: 'No valid rows found in CSV' });
    }

    const operations = docs.map((doc) => ({
      updateOne: {
        filter: { sku: doc.sku },
        update: { $set: doc },
        upsert: true
      }
    }));

    const result = await Inventory.bulkWrite(operations, { ordered: false });
    const upsertedCount = result.upsertedCount || 0;
    const modifiedCount = result.modifiedCount || 0;
    console.log(`[Records Inserted] inventory upserted=${upsertedCount} modified=${modifiedCount}`);

    return res.status(201).json({
      message: 'CSV uploaded successfully',
      insertedCount: upsertedCount,
      updatedCount: modifiedCount,
      processedCount: docs.length
    });
  } finally {
    fs.promises.unlink(req.file.path).catch(() => {});
  }
}));

app.get('/api/ml/historical-data', asyncHandler(async (req, res) => {
  res.json({
    message: 'ML hook ready',
    generatedAt: new Date().toISOString(),
    inventoryCount: await Inventory.countDocuments()
  });
}));

app.post('/api/ml/update-forecasts', asyncHandler(async (req, res) => {
  const forecasts = Array.isArray(req.body.forecasts) ? req.body.forecasts : [];
  console.log(`[Records Inserted] forecast_payloads=${forecasts.length}`);
  res.json({
    message: 'ML hook ready',
    receivedCount: forecasts.length
  });
}));

app.use((err, req, res, next) => {
  console.error('[Error]', err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: 'Validation error', details: err.message });
  }

  if (err.code === 11000) {
    return res.status(409).json({ message: 'Duplicate key error', details: err.keyValue });
  }

  if (err.name === 'MulterError') {
    return res.status(400).json({ message: 'File upload error', details: err.message });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid identifier format', details: err.message });
  }

  return res.status(500).json({ message: 'Internal server error' });
});

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    throw error;
  }
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

module.exports = app;
