const db = require("../db");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "xisekelo-safety-secret-key-change-in-production";

// Middleware to verify admin token
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: "Admin access required" });
    }
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Get dashboard stats
const getDashboardStats = async (req, res) => {
  try {
    // Get total products
    const productsResult = await db.query("SELECT COUNT(*) as count FROM products");
    const totalProducts = parseInt(productsResult.rows[0].count);

    // Get total orders
    const ordersResult = await db.query("SELECT COUNT(*) as count FROM orders");
    const totalOrders = parseInt(ordersResult.rows[0].count);

    // Get total revenue
    const revenueResult = await db.query(
      "SELECT COALESCE(SUM(total_amount), 0) as total FROM orders WHERE status = 'paid'"
    );
    const revenue = parseFloat(revenueResult.rows[0].total || 0);

    // Get orders this week
    const weekOrdersResult = await db.query(
      `SELECT COUNT(*) as count FROM orders 
       WHERE created_at >= NOW() - INTERVAL '7 days'`
    );
    const weekOrders = parseInt(weekOrdersResult.rows[0].count);

    // Get revenue this week
    const weekRevenueResult = await db.query(
      `SELECT COALESCE(SUM(total_amount), 0) as total FROM orders 
       WHERE status = 'paid' AND created_at >= NOW() - INTERVAL '7 days'`
    );
    const weekRevenue = parseFloat(weekRevenueResult.rows[0].total || 0);

    res.status(200).json({
      totalProducts,
      totalOrders,
      revenue: revenue.toFixed(2),
      weekOrders,
      weekRevenue: weekRevenue.toFixed(2),
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ message: "Unable to fetch dashboard stats" });
  }
};

// Get all orders (admin)
const getAllOrders = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT 
        o.id,
        o.total_amount,
        o.status,
        o.created_at,
        u.name as customer_name,
        u.email as customer_email,
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
      LEFT JOIN users u ON o.user_id = u.id
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      GROUP BY o.id, o.total_amount, o.status, o.created_at, u.name, u.email
      ORDER BY o.created_at DESC`
    );

    const orders = result.rows.map(row => ({
      id: row.id.toString(),
      totalAmount: parseFloat(row.total_amount),
      status: row.status,
      createdAt: row.created_at,
      customer: row.customer_name || 'Unknown',
      email: row.customer_email || '',
      items: row.items || [],
    }));

    res.status(200).json(orders);
  } catch (error) {
    console.error("Get all orders error:", error);
    res.status(500).json({ message: "Unable to fetch orders" });
  }
};

module.exports = {
  getDashboardStats: [verifyAdmin, getDashboardStats],
  getAllOrders: [verifyAdmin, getAllOrders],
};

