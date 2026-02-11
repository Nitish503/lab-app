const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.get("/", (req, res) => {
  res.send("Lab App Connected to Database 🚀");
});

// Create Patients Table Automatically
app.get("/create-table", async (req, res) => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS patients (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        age INT,
        gender VARCHAR(10),
        phone VARCHAR(15)
      )
    `);
    res.send("Patients table created successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating table");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});