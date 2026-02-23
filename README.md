# Vector-AI

Vector AI is a unified decision support platform bridging the gap between
strategy and execution.

## Features
- Login & Signup system
- Dashboard with analytics
- Inventory and stock visualization
- Sales and alerts components
- Secure Express + MongoDB backend API layer

## Tech Stack
- React
- JavaScript
- CSS
- Express
- MongoDB
- Tailwind
- Mongoose
- Multer
- csv-parser

## Backend Implementation (Completed)

Implemented a full Node.js backend so the frontend never accesses MongoDB directly.
All data operations are handled through REST APIs.

### Added Backend Files
- `backend/server.js`
- `backend/models/Inventory.js`
- `backend/.env.example`
- `backend/package.json`
- `backend/uploads/`

### Inventory Model
`Inventory` schema fields:
- `name` (String)
- `sku` (String, unique)
- `quantity` (Number)
- `price` (Number)
- `category` (String)
- `createdAt` (Date, default now)

### Implemented APIs
- `GET /api/health`
- `GET /api/inventory`
- `GET /api/inventory/:id`
- `POST /api/inventory`
- `PUT /api/inventory/:id`
- `DELETE /api/inventory/:id`
- `POST /api/upload-csv`
- `GET /api/ml/historical-data`
- `POST /api/ml/update-forecasts`

### Backend Best Practices Included
- Environment-variable based configuration
- MongoDB connection via Mongoose
- CORS and JSON middleware
- Async/await route handlers with centralized error middleware
- Mongo ObjectId validation for parameterized routes
- CSV bulk upload with `multer + csv-parser + fs`
- CSV duplicate SKU handling with upsert (`bulkWrite`)
- Request logging (`[Route Hit]`) and insert/error logging for debugging

## Stabilization Updates (Latest)

### Backend Stabilization
- Added explicit MongoDB connection success/failure logs.
- Added route-level logs for request tracing.
- Added centralized error logging (`[Error] ...`).
- Updated CSV upload flow to upsert by `sku` instead of failing on duplicate keys.
- Kept all existing API paths unchanged.

### Frontend-to-Backend Connectivity Fixes
- Updated `src/Api/Api.js` to build backend URL from current browser host:
  - If frontend runs on `127.0.0.1`, API uses `127.0.0.1:5000`
  - If frontend runs on `localhost`, API uses `localhost:5000`
- Improved fetch request handling:
  - `Content-Type: application/json` only when body exists and is not `FormData`
  - `cache: "no-store"` for fresh reads
  - cleaner error propagation (`Failed to fetch` and backend message handling)
- Updated inventory mapping in frontend API adapter to match backend `Inventory` schema:
  - `quantity`, `price`, `sku`, `category`, `name`
- Updated stock table error rendering to show actual backend error text.

## Setup
```bash
npm install
copy backend\.env.example backend\.env
npm run server
npm run dev
```

## Backend Env
Create `backend/.env`:

```env
MONGO_URI=<mongodb connection string>
PORT=5000
MAX_CSV_SIZE_BYTES=10485760
```

## Quick API Check
```bash
curl http://localhost:5000/api/health
curl http://localhost:5000/api/inventory
```

## Run Guide (Recommended)
Use two terminals from project root:

Terminal 1:
```bash
npm run server
```

Terminal 2:
```bash
npm run dev -- --host 127.0.0.1 --port 5173
```

Open:
`http://127.0.0.1:5173/`

## Troubleshooting
- If frontend shows `Failed to fetch`:
  1. Confirm backend is running on port `5000`.
  2. Confirm frontend is running on `127.0.0.1:5173` (or use same hostname pair with backend).
  3. Hard refresh browser (`Ctrl+F5`).
- If item create fails:
  1. Check backend terminal logs.
  2. Verify `sku` uniqueness (duplicate SKU returns conflict).
  3. Verify `MONGO_URI` points to writable DB.
