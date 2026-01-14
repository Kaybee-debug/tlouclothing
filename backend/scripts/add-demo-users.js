// Script to add demo users to database
const db = require("../db");
const bcrypt = require("bcryptjs");

async function addDemoUsers() {
  try {
    console.log("Adding demo users...");

    // Hash passwords
    const adminPasswordHash = await bcrypt.hash("admin123", 10);
    const customerPasswordHash = await bcrypt.hash("customer123", 10);

    // Add admin user
    await db.query(
      `INSERT INTO users (name, email, password_hash, role) 
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (email) DO UPDATE SET
         name = EXCLUDED.name,
         password_hash = EXCLUDED.password_hash,
         role = EXCLUDED.role`,
      ["Admin User", "admin@fabric.com", adminPasswordHash, "admin"]
    );
    console.log("✅ Admin user added: admin@fabric.com / admin123");

    // Add customer user
    await db.query(
      `INSERT INTO users (name, email, password_hash, role) 
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (email) DO UPDATE SET
         name = EXCLUDED.name,
         password_hash = EXCLUDED.password_hash,
         role = EXCLUDED.role`,
      ["John Customer", "john@example.com", customerPasswordHash, "customer"]
    );
    console.log("✅ Customer user added: john@example.com / customer123");

    console.log("\n✅ Demo users added successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error adding demo users:", error);
    process.exit(1);
  }
}

addDemoUsers();

