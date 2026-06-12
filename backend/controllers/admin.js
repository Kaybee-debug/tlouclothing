const { Pool } = require('pg');
const { seedTlouCatalog } = require('../db/seed-tlou-catalog');
const { TLOU_CATEGORIES } = require('../data/tlou-catalog');

async function ensureTlouCategories() {
  for (const name of TLOU_CATEGORIES) {
    const existing = await pool.query('SELECT id FROM categories WHERE name = $1', [name]);
    if (existing.rows.length === 0) {
      await pool.query('INSERT INTO categories (name) VALUES ($1)', [name]);
    }
  }
}

const pool = new Pool({
  user: process.env.DB_USER || 'xisekelo',
  host: process.env.DB_HOST || '10.0.0.65',
  database: process.env.DB_NAME || 'xisekelo',
  password: process.env.DB_PASSWORD || 'pass123',
  port: process.env.DB_PORT || 5432,
});

// Test connection
pool.query('SELECT NOW()')
  .then(() => console.log('Admin controller: Database connection OK'))
  .catch(err => console.error('Admin controller: Database connection failed:', err));

const getDashboardStats = async (req, res) => {
  try {
    console.log('Fetching dashboard stats...');
    
    // Get total products
    const productsResult = await pool.query('SELECT COUNT(*) FROM products');
    const totalProducts = parseInt(productsResult.rows[0].count);
    console.log('Total products:', totalProducts);

    // Get products added this week
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const productsThisWeekResult = await pool.query(
      'SELECT COUNT(*) FROM products WHERE created_at >= $1',
      [weekAgo]
    );
    const productsThisWeek = parseInt(productsThisWeekResult.rows[0].count);

    // Get total orders
    const ordersResult = await pool.query('SELECT COUNT(*) FROM orders');
    const totalOrders = parseInt(ordersResult.rows[0].count);
    console.log('Total orders:', totalOrders);

    // Get orders this week
    const ordersThisWeekResult = await pool.query(
      'SELECT COUNT(*) FROM orders WHERE created_at >= $1',
      [weekAgo]
    );
    const ordersThisWeek = parseInt(ordersThisWeekResult.rows[0].count);

    // Revenue only after admin confirms payment (paid, processing, shipped, etc.)
    const revenueStatuses = ['paid', 'processing', 'shipped', 'delivered', 'completed'];
    const revenuePlaceholders = revenueStatuses.map((_, i) => `$${i + 1}`).join(', ');
    const revenueResult = await pool.query(
      `SELECT SUM(total_amount) FROM orders WHERE status IN (${revenuePlaceholders})`,
      revenueStatuses
    );
    const totalRevenue = parseFloat(revenueResult.rows[0].sum) || 0;
    console.log('Total revenue:', totalRevenue);

    // Get revenue this month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    const revenueThisMonthResult = await pool.query(
      `SELECT SUM(total_amount) FROM orders WHERE status IN (${revenuePlaceholders}) AND created_at >= $${revenueStatuses.length + 1}`,
      [...revenueStatuses, startOfMonth]
    );
    const revenueThisMonth = parseFloat(revenueThisMonthResult.rows[0].sum) || 0;

    // Get revenue last month
    const startOfLastMonth = new Date(startOfMonth);
    startOfLastMonth.setMonth(startOfLastMonth.getMonth() - 1);
    const endOfLastMonth = new Date(startOfMonth);
    const revenueLastMonthResult = await pool.query(
      `SELECT SUM(total_amount) FROM orders WHERE status IN (${revenuePlaceholders}) AND created_at >= $${revenueStatuses.length + 1} AND created_at < $${revenueStatuses.length + 2}`,
      [...revenueStatuses, startOfLastMonth, endOfLastMonth]
    );
    const revenueLastMonth = parseFloat(revenueLastMonthResult.rows[0].sum) || 0;

    // Calculate revenue percentage change
    const revenueChange = revenueLastMonth > 0 
      ? ((revenueThisMonth - revenueLastMonth) / revenueLastMonth * 100).toFixed(1)
      : revenueThisMonth > 0 ? '100' : '0';

    // Get total users (for conversion rate calculation)
    const usersResult = await pool.query('SELECT COUNT(*) FROM users');
    const totalUsers = parseInt(usersResult.rows[0].count);

    // Calculate conversion rate (orders / users * 100)
    const conversionRate = totalUsers > 0 
      ? ((totalOrders / totalUsers) * 100).toFixed(1)
      : '0';

    // Get conversion rate last month (approximate)
    const usersLastMonthResult = await pool.query(
      'SELECT COUNT(*) FROM users WHERE created_at < $1',
      [startOfMonth]
    );
    const usersLastMonth = parseInt(usersLastMonthResult.rows[0].count);
    const ordersLastMonthResult = await pool.query(
      'SELECT COUNT(*) FROM orders WHERE created_at >= $1 AND created_at < $2',
      [startOfLastMonth, endOfLastMonth]
    );
    const ordersLastMonth = parseInt(ordersLastMonthResult.rows[0].count);
    const conversionRateLastMonth = usersLastMonth > 0
      ? ((ordersLastMonth / usersLastMonth) * 100).toFixed(1)
      : '0';
    const conversionRateChange = (parseFloat(conversionRate) - parseFloat(conversionRateLastMonth)).toFixed(1);

    // Get low stock products (stock < 50)
    const lowStockResult = await pool.query(
      `SELECT p.*, c.name as category 
       FROM products p 
       LEFT JOIN categories c ON p.category_id = c.id 
       WHERE p.stock < 50 
       ORDER BY p.stock ASC 
       LIMIT 5`
    );

    // Get recent orders
    const recentOrdersResult = await pool.query(
      'SELECT o.*, u.name as user_name, u.email as user_email FROM orders o LEFT JOIN users u ON o.user_id = u.id ORDER BY o.created_at DESC LIMIT 5'
    );
    console.log('Recent orders:', recentOrdersResult.rows.length);
    console.log('Low stock products:', lowStockResult.rows.length);

    const statsData = {
      totalProducts,
      productsThisWeek,
      totalOrders,
      ordersThisWeek,
      totalRevenue,
      revenueThisMonth,
      revenueChange,
      conversionRate,
      conversionRateChange,
      totalUsers,
      recentOrders: recentOrdersResult.rows.map(order => ({
        ...order,
        total: parseFloat(order.total_amount) || 0,
        total_amount: parseFloat(order.total_amount) || 0
      })),
      lowStockProducts: lowStockResult.rows.map(product => ({
        ...product,
        id: product.id.toString(),
        price: parseFloat(product.price) || 0,
        stock: parseInt(product.stock) || 0
      }))
    };
    
    console.log('Dashboard stats prepared:', JSON.stringify(statsData, null, 2));
    
    res.json({
      stats: statsData
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    console.error('Error details:', error.message, error.stack);
    res.status(500).json({ 
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT o.*, u.name as user_name, u.email as user_email FROM orders o JOIN users u ON o.user_id = u.id ORDER BY o.created_at DESC'
    );

    // Map total_amount to total for frontend compatibility
    const orders = result.rows.map(order => ({
      ...order,
      total: parseFloat(order.total_amount) || 0
    }));

    res.json({ orders });
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    const result = await pool.query(
      'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ order: result.rows[0] });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

function sortCategoryRows(rows) {
  return [...rows].sort((a, b) => {
    const ai = TLOU_CATEGORIES.indexOf(a.name);
    const bi = TLOU_CATEGORIES.indexOf(b.name);
    const aOrder = ai === -1 ? TLOU_CATEGORIES.length + 1 : ai;
    const bOrder = bi === -1 ? TLOU_CATEGORIES.length + 1 : bi;
    if (aOrder !== bOrder) return aOrder - bOrder;
    return a.name.localeCompare(b.name);
  });
}

const getCategories = async (req, res) => {
  try {
    await ensureTlouCategories();
    const result = await pool.query('SELECT id, name FROM categories');
    res.json({ categories: sortCategoryRows(result.rows) });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, category, price, stock, image_url } = req.body;

    // First, get or create category
    let categoryResult = await pool.query('SELECT id FROM categories WHERE name = $1', [category]);
    let categoryId;

    if (categoryResult.rows.length === 0) {
      const newCategory = await pool.query('INSERT INTO categories (name) VALUES ($1) RETURNING id', [category]);
      categoryId = newCategory.rows[0].id;
    } else {
      categoryId = categoryResult.rows[0].id;
    }

    // Insert product
    const result = await pool.query(
      `INSERT INTO products (name, description, category_id, price, stock, image_url)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, description, categoryId, price, stock, image_url || null]
    );

    // Get product with category name
    const productResult = await pool.query(
      `SELECT p.*, c.name as category
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.id = $1`,
      [result.rows[0].id]
    );

    res.status(201).json({
      id: productResult.rows[0].id.toString(),
      category_id: productResult.rows[0].category_id,
      category: productResult.rows[0].category || 'General',
      name: productResult.rows[0].name,
      description: productResult.rows[0].description,
      price: parseFloat(productResult.rows[0].price),
      stock: productResult.rows[0].stock,
      image_url: productResult.rows[0].image_url || '',
      created_at: productResult.rows[0].created_at
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category, price, stock, image_url } = req.body;

    // Get or create category
    let categoryResult = await pool.query('SELECT id FROM categories WHERE name = $1', [category]);
    let categoryId;

    if (categoryResult.rows.length === 0) {
      const newCategory = await pool.query('INSERT INTO categories (name) VALUES ($1) RETURNING id', [category]);
      categoryId = newCategory.rows[0].id;
    } else {
      categoryId = categoryResult.rows[0].id;
    }

    // Update product
    await pool.query(
      `UPDATE products
       SET name = $1, description = $2, category_id = $3, price = $4, stock = $5, image_url = $6
       WHERE id = $7`,
      [name, description, categoryId, price, stock, image_url || null, id]
    );

    // Get updated product with category name
    const productResult = await pool.query(
      `SELECT p.*, c.name as category
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.id = $1`,
      [id]
    );

    if (productResult.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({
      id: productResult.rows[0].id.toString(),
      category_id: productResult.rows[0].category_id,
      category: productResult.rows[0].category || 'General',
      name: productResult.rows[0].name,
      description: productResult.rows[0].description,
      price: parseFloat(productResult.rows[0].price),
      stock: productResult.rows[0].stock,
      image_url: productResult.rows[0].image_url || '',
      created_at: productResult.rows[0].created_at
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const syncCatalog = async (req, res) => {
  try {
    const result = await seedTlouCatalog(pool);
    res.json({
      message: 'T.L.O.U. Clothing catalog synced successfully',
      count: result.count,
    });
  } catch (error) {
    console.error('Sync catalog error:', error);
    res.status(500).json({ message: 'Failed to sync T.L.O.U. catalog' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getDashboardStats,
  getAllOrders,
  updateOrderStatus,
  getCategories,
  syncCatalog,
  createProduct,
  updateProduct,
  deleteProduct
};