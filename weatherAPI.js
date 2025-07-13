const express = require("express");
const cors = require("cors");
const fs = require("fs");
const PORT = 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("."));

app.get("/:city", (req, res) => {
  const city = req.params.city.toLowerCase();
  try {
    const weatherData = JSON.parse(fs.readFileSync("database.json"));

    if (weatherData.cities[city]) {
      res.json(weatherData.cities[city]);
    } else {
      res.status(404).json({ error: "City not found" });
    }
  } catch (err) {
    console.error("Error reading database:", err.message);
    res.status(500).json({ error: "Failed to connect to database" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
