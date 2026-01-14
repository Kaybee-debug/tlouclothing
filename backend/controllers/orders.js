const db = require("../db");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "xisekelo-safety-secret-key-change-in-production";

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Create a new order
const createOrder = async (req, res) => {
  try {
    const userId = req.userId || req.body.userId;
    const { items, totalAmount, shippingAddress } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Order items are required" });
    }

    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({ message: "Invalid total amount" });
    }

    // Start transaction
    const client = await db.connect();
    
    try {
      await client.query('BEGIN');

      // Create order
      const orderResult = await client.query(
        `INSERT INTO orders (user_id, total_amount, status) 
         VALUES ($1, $2, 'paid') 
         RETURNING id, total_amount, status, created_at`,
        [userId, totalAmount]
      );

      const order = orderResult.rows[0];
      const orderId = order.id;

      // Insert order items
      for (const item of items) {
        await client.query(
          `INSERT INTO order_items (order_id, product_id, quantity, price) 
           VALUES ($1, $2, $3, $4)`,
          [orderId, item.productId, item.quantity, item.price]
        );
      }

      await client.query('COMMIT');

      // Fetch complete order with items
      const orderWithItems = await db.query(
        `SELECT 
          o.id,
          o.total_amount,
          o.status,
          o.created_at,
          json_agg(
            json_build_object(
              'id', oi.id,
              'product_id', oi.product_id,
              'product_name', p.name,
              'quantity', oi.quantity,
              'price', oi.price
            )
          ) as items
        FROM orders o
        LEFT JOIN order_items oi ON o.id = oi.order_id
        LEFT JOIN products p ON oi.product_id = p.id
        WHERE o.id = $1
        GROUP BY o.id, o.total_amount, o.status, o.created_at`,
        [orderId]
      );

      res.status(201).json({
        message: "Order created successfully",
        order: orderWithItems.rows[0],
      });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ message: "Unable to create order" });
  }
};

// Get user's orders
const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;
    
    if (!userId) {
      return res.status(401).json({ message: "User ID not found" });
    }

    const result = await db.query(
      `SELECT 
        o.id,
        o.total_amount,
        o.status,
        o.created_at,
        json_agg(
          json_build_object(
            'id', oi.id,
            'product_id', oi.product_id,
            'product_name', p.name,
            'quantity', oi.quantity,
            'price', oi.price
          )
        ) FILTER (WHERE oi.id IS NOT NULL) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE o.user_id = $1
      GROUP BY o.id, o.total_amount, o.status, o.created_at
      ORDER BY o.created_at DESC`,
      [userId]
    );

    const orders = result.rows.map(row => ({
      id: row.id.toString(),
      totalAmount: parseFloat(row.total_amount),
      status: row.status,
      createdAt: row.created_at,
      items: row.items || [],
    }));

    res.status(200).json(orders);
  } catch (error) {
    console.error("Get orders error:", error);
    res.status(500).json({ message: "Unable to fetch orders" });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
};

