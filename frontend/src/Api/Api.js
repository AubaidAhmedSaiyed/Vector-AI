// src/api/api.js

// 🔹 BASE CONFIG (future backend)
const BASE_URL = "http://localhost:5000/api"; // future use

/* ================= AUTH ================= */

// Demo login (email/password)
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

// Get stock list
export const getStock = async () => {
  return [
    {
      name: "Milk",
      quantity: 20,
      price: 30,
      cost: 25,
      expiry: "2026-01-10",
    },
    {
      name: "Maggi",
      quantity: 40,
      price: 15,
      cost: 10,
      expiry: "2026-03-01",
    },
  ];
};

// Add stock item
export const addStockItem = async (item) => {
  return { success: true, item };
};

// Update stock (sale / edit)
export const updateStock = async (itemName, soldQty) => {
  return { success: true };
};

// Activate / Deactivate product
export const toggleProductStatus = async (productName, active) => {
  return { success: true };
};

/* ================= SALES ================= */

// Daily sale entry
export const addDailySale = async ({ productName, quantity }) => {
  return {
    success: true,
    message: "Sale recorded",
  };
};

// Get today sales
export const getTodaySales = async () => {
  return [
    { product: "Milk", sold: 5 },
    { product: "Maggi", sold: 10 },
  ];
};

/* ================= ANALYTICS ================= */

// Profit analytics
export const getProfitAnalytics = async () => {
  return {
    totalProfit: 250,
    byProduct: [
      { name: "Milk", profit: 100 },
      { name: "Maggi", profit: 150 },
    ],
  };
};

// Inventory distribution
export const getInventoryAnalytics = async () => {
  return [
    { name: "Milk", quantity: 20 },
    { name: "Maggi", quantity: 40 },
  ];
};

/* ================= ALERTS ================= */

// Expiry alerts
export const getExpiryAlerts = async () => {
  return [
    {
      product: "Milk",
      expiry: "2026-01-10",
      daysLeft: 5,
    },
  ];
};

/* ================= AI SUGGESTIONS ================= */

// Sales suggestions (AI placeholder)
export const getSalesSuggestions = async () => {
  return [
    {
      product: "Milk",
      pairWith: ["Bread", "Biscuit"],
      offer: "Buy Milk + Bread & get 5% off",
    },
    {
      product: "Maggi",
      pairWith: ["Sauce", "Masala"],
      offer: "Buy 2 Maggi & get Sauce free",
    },
  ];
};
