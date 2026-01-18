const express = require("express");
const axios = require("axios");

const app = express();

// Middleware
app.use(express.json());

// Mock plant data
const plants = [
  { id: 1, name: "Rose", type: "Flower" },
  { id: 2, name: "Tulsi", type: "Herb" },
  { id: 3, name: "Cactus", type: "Succulent" },
];

// Root route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Local plants (list)
app.get("/plants", (req, res) => {
  res.status(200).json({
    success: true,
    data: plants,
  });
});

// ✅ NEW ROUTE: View single local plant
app.get("/plants/:id", (req, res) => {
  const plantId = parseInt(req.params.id);

  const plant = plants.find(p => p.id === plantId);

  if (!plant) {
    return res.status(404).json({
      success: false,
      message: "Plant not found",
    });
  }

  res.status(200).json({
    success: true,
    data: plant,
  });
});

// Public plant API (NO API KEY)
app.get("/plants/public", async (req, res) => {
  try {
    const response = await axios.get(
      "https://openfarm.cc/api/v1/crops",
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
          Accept: "application/json",
        },
      }
    );

    res.status(200).json({
      success: true,
      count: response.data.data.length,
      data: response.data.data,
    });
  } catch (error) {
    console.error("API ERROR:", error.response?.status, error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch plant data",
    });
  }
});

module.exports = app;
