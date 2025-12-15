const db = require("../db");

const getProducts = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT
        id,
        category_id,
        name,
        description,
        price,
        stock,
        created_at
      FROM products
      ORDER BY created_at DESC
    `);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Database error:", error); // <-- important
    res.status(500).json({ message: "Unable to fetch products" });
  }
};

module.exports = {
  getProducts,
};
