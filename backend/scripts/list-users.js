// Script to list all users in database
const db = require("../db");

async function listUsers() {
  try {
    const result = await db.query(
      "SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC"
    );

    console.log("\n📊 Users in Database:\n");
    console.log("Total users:", result.rows.length);
    console.log("\n" + "=".repeat(80));
    
    result.rows.forEach((user, index) => {
      console.log(`\n${index + 1}. ${user.name}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   ID: ${user.id}`);
      console.log(`   Created: ${new Date(user.created_at).toLocaleString()}`);
    });
    
    console.log("\n" + "=".repeat(80) + "\n");
    
    await db.end();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error listing users:", error);
    process.exit(1);
  }
}

listUsers();

