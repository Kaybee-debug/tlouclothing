const { Pool } = require("pg");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

// Connect to PostgreSQL server (not a specific database) to create database
const adminPool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD,
  database: "postgres", // Connect to default postgres database
});

async function createDatabase() {
  const dbName = process.env.DB_NAME || "xiselosafety";
  
  try {
    // Check if database exists
    const checkDb = await adminPool.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [dbName]
    );

    if (checkDb.rows.length === 0) {
      // Create database
      await adminPool.query(`CREATE DATABASE ${dbName}`);
      console.log(`✅ Database '${dbName}' created successfully`);
    } else {
      console.log(`✅ Database '${dbName}' already exists`);
    }

    // Close admin connection
    await adminPool.end();

    // Connect to the new database and run schema
    const dbPool = new Pool({
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || 5432,
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD,
      database: dbName,
    });

    // Read and execute schema
    const schemaPath = path.join(__dirname, "schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf8");
    
    // Split by semicolons and execute each statement
    const statements = schema
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && !s.startsWith("--"));

    for (const statement of statements) {
      if (statement.toLowerCase().includes("create database")) {
        continue; // Skip CREATE DATABASE statements
      }
      try {
        await dbPool.query(statement);
      } catch (err) {
        // Ignore "already exists" errors
        if (!err.message.includes("already exists")) {
          console.error("Error executing statement:", err.message);
        }
      }
    }

    console.log("✅ Database schema created successfully");
    await dbPool.end();
  } catch (error) {
    console.error("❌ Error setting up database:", error.message);
    process.exit(1);
  }
}

createDatabase();

