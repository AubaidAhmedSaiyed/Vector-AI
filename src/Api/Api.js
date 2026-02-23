const DEFAULT_API_BASE_URL =
  typeof window !== "undefined"
    ? `${window.location.protocol}//${window.location.hostname}:5000/api`
    : "http://localhost:5000/api";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;

const request = async (path, options = {}) => {
  const isFormData = typeof FormData !== "undefined" && options.body instanceof FormData;
  const method = String(options.method || "GET").toUpperCase();
  const hasBody = options.body !== undefined && options.body !== null;

  const headers = {
    ...(hasBody && !isFormData ? { "Content-Type": "application/json" } : {}),
    ...(options.headers || {}),
  };

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      cache: "no-store",
      mode: "cors",
      ...options,
      method,
      headers,
    });

    let body = null;
    try {
      body = await response.json();
    } catch (error) {
      body = null;
    }

    if (!response.ok) {
      const message = body?.message || `Request failed (${response.status})`;
      throw new Error(message);
    }

    return body;
  } catch (error) {
    if (error instanceof Error && error.message) {
      throw error;
    }
    throw new Error("Failed to fetch");
  }
};

const mapProductToStockItem = (product) => ({
  id: product._id,
  name: product.name,
  quantity: product.quantity ?? 0,
  price: product.price ?? 0,
  cost: product.cost ?? 0,
  sku: product.sku,
  category: product.category || "",
  brand: product.brand || "",
  reorderPoint: 0,
  safetyStock: 0
});

/* ================= AUTH ================= */

// Keep demo auth until backend auth routes are added.
export const loginUser = async (email, password) => {
  if (email === "admin@retail.com" && password === "admin123") {
    return { role: "admin", token: "demo-admin-token" };
  }

  if (email === "staff@retail.com" && password === "staff123") {
    return { role: "staff", token: "demo-staff-token" };
  }

  throw new Error("Invalid credentials");
};

/* ================= STOCK ================= */

const normalizeInventoryPayload = (item = {}) => ({
  name: item.name,
  sku: item.sku,
  category: item.category,
  quantity: Number(item.quantity ?? 0),
  price: Number(item.price ?? 0),
});

export const getInventory = async () => {
  const products = await request("/inventory");
  return products.map(mapProductToStockItem);
};

export const addInventoryItem = async (item) => {
  const payload = normalizeInventoryPayload(item);
  const created = await request("/inventory", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return { success: true, item: mapProductToStockItem(created) };
};

export const updateInventoryItem = async (itemId, updates) => {
  const payload =
    typeof updates === "number"
      ? { quantity: updates }
      : {
          ...normalizeInventoryPayload(updates),
          name: updates?.name,
          sku: updates?.sku,
          category: updates?.category
        };

  const updated = await request(`/inventory/${itemId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  return { success: true, item: mapProductToStockItem(updated) };
};

export const deleteInventoryItem = async (itemId) => {
  await request(`/inventory/${itemId}`, { method: "DELETE" });
  return { success: true };
};

export const toggleProductStatus = async (productName, active) => {
  return { success: true, productName, active };
};

export const uploadCSV = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return request("/upload-csv", {
    method: "POST",
    body: formData,
  });
};

// Backward compatible aliases.
export const getStock = getInventory;
export const addStockItem = addInventoryItem;
export const updateStock = updateInventoryItem;
export const deleteStockItem = deleteInventoryItem;
export const uploadInventoryCsv = uploadCSV;

/* ================= SALES ================= */

export const addDailySale = async ({ productName, quantity }) => {
  return {
    success: true,
    message: `Sale placeholder saved for ${productName} (${quantity})`,
  };
};

export const getTodaySales = async () => {
  return [];
};

/* ================= ANALYTICS ================= */

export const getProfitAnalytics = async () => {
  const stock = await getInventory();
  const byProduct = stock.map((item) => ({
    name: item.name,
    profit: (item.price - item.cost) * item.quantity,
  }));
  const totalProfit = byProduct.reduce((sum, row) => sum + row.profit, 0);

  return { totalProfit, byProduct };
};

export const getInventoryAnalytics = async () => {
  const stock = await getInventory();
  return stock.map((item) => ({ name: item.name, quantity: item.quantity }));
};

/* ================= ALERTS ================= */

export const getExpiryAlerts = async () => {
  await request("/ml/historical-data?limit=200");
  return [];
};

/* ================= AI SUGGESTIONS ================= */

export const getSalesSuggestions = async () => {
  const stock = await getInventory();
  const lowStock = stock
    .filter((item) => item.quantity <= Math.max(item.reorderPoint, item.safetyStock))
    .slice(0, 3);

  if (lowStock.length === 0) {
    return [];
  }

  return lowStock.map((item) => ({
    product: item.name,
    pairWith: ["Bundle Item A", "Bundle Item B"],
    offer: `Restock ${item.name} soon and run a combo offer`,
  }));
};

/* ================= ML HOOKS ================= */

export const getHistoricalData = async (params = "") => {
  const suffix = params ? `?${params}` : "";
  return request(`/ml/historical-data${suffix}`);
};

export const updateForecasts = async (forecasts) => {
  return request("/ml/update-forecasts", {
    method: "POST",
    body: JSON.stringify({ forecasts }),
  });
};
