const express = require("express");
const axios = require("axios");

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Mock plant data (local)
const plants = [
  { id: 1, name: "Rose", type: "Flower" },
  { id: 2, name: "Tulsi", type: "Herb" },
  { id: 3, name: "Cactus", type: "Succulent" },
];

// Root route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// GET all plants (local mock data)
app.get("/plants", (req, res) => {
  res.status(200).json({
    success: true,
    data: plants,
  });
});

// GET plants from FREE public API (NO API KEY)
app.get("/plants/public", async (req, res) => {
  try {
    const response = await axios.get(
      "https://openfarm.cc/api/v1/crops"
    );

    res.status(200).json({
      success: true,
      count: response.data.data.length,
      data: response.data.data,
    });
  } catch (error) {
    console.error("External API error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch plant data",
    });
  }
});

module.exports = app;
