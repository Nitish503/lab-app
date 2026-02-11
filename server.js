const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Home Route
app.get("/", (req, res) => {
  res.send("Diagnostic Lab App Running Successfully 🚀");
});

// Create Patients Table
app.get("/create-table", async (req, res) => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS patients (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        age INT,
        gender VARCHAR(10),
        phone VARCHAR(15)
      );
    `);

    res.send("Patients table created successfully ✅");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating table ❌");
  }
});

// IMPORTANT: Bind to 0.0.0.0 for Render
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});