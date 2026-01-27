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

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
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
      WHERE p.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const product = {
      id: result.rows[0].id.toString(),
      category_id: result.rows[0].category_id,
      category: result.rows[0].category || 'General',
      name: result.rows[0].name,
      description: result.rows[0].description,
      price: parseFloat(result.rows[0].price),
      stock: result.rows[0].stock,
      image_url: result.rows[0].image_url || '',
      created_at: result.rows[0].created_at,
    };

    res.status(200).json(product);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Unable to fetch product" });
  }
};

module.exports = {
  getProducts,
  getProduct,
};
