const express = require("express");

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Mock plant data (temporary)
const plants = [
  { id: 1, name: "Rose", type: "Flower" },
  { id: 2, name: "Tulsi", type: "Herb" },
  { id: 3, name: "Cactus", type: "Succulent" },
];

// Root route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// GET all plants
app.get("/plants", (req, res) => {
  res.status(200).json({
    success: true,
    data: plants,
  });
});

module.exports = app;
