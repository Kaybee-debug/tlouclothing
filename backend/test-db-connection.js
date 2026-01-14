// Test database connection
const { Pool } = require("pg");
require("dotenv").config();

console.log("Testing database connection...");
console.log("Config:", {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD ? "***" : "NOT SET"
});

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function testConnection() {
  try {
    // Test basic connection
    const result = await pool.query("SELECT 1 as test");
    console.log("✅ Database connection successful!");
    
    // Test if tables exist
    const tablesResult = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    console.log("\n📊 Tables found:", tablesResult.rows.map(r => r.table_name).join(", "));
    
    // Test products query
    const productsResult = await pool.query("SELECT COUNT(*) as count FROM products");
    console.log(`\n📦 Products in database: ${productsResult.rows[0].count}`);
    
    // Test categories query
    const categoriesResult = await pool.query("SELECT COUNT(*) as count FROM categories");
    console.log(`📁 Categories in database: ${categoriesResult.rows[0].count}`);
    
    await pool.end();
    console.log("\n✅ All tests passed!");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Database connection failed!");
    console.error("Error:", error.message);
    console.error("\nTroubleshooting:");
    console.error("1. Make sure PostgreSQL is running on", process.env.DB_HOST);
    console.error("2. Verify the database 'xisekelo' exists");
    console.error("3. Verify the user 'xisekelo' exists and has permissions");
    console.error("4. Check if PostgreSQL allows remote connections (pg_hba.conf)");
    console.error("5. Verify firewall allows connection on port", process.env.DB_PORT);
    process.exit(1);
  }
}

testConnection();

