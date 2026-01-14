const db = require("../db");

const getProducts = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT
        p.id,
        p.category_id,
        c.name as category,
        p.name,
        p.description,
        p.price,
        p.stock,
        p.image_url,
        p.created_at
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.created_at DESC
    `);

    // Map the results to match frontend expectations
    const products = result.rows.map(row => ({
      id: row.id.toString(),
      category_id: row.category_id,
      category: row.category || 'General',
      name: row.name,
      description: row.description,
      price: parseFloat(row.price),
      stock: row.stock,
      image_url: row.image_url || '',
      created_at: row.created_at,
    }));

    res.status(200).json(products);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Unable to fetch products" });
  }
};

module.exports = {
  getProducts,
};
