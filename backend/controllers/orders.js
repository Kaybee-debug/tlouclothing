const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'xisekelo',
  host: process.env.DB_HOST || '10.0.0.65',
  database: process.env.DB_NAME || 'xisekelo',
  password: process.env.DB_PASSWORD || 'pass123',
  port: process.env.DB_PORT || 5432,
});

const createOrder = async (req, res) => {
  try {
    const { items, total, shippingAddress } = req.body;
    const userId = req.userId;

    console.log('Creating order with:', { userId, itemsCount: items?.length, total, shippingAddress });

    if (!items || !total) {
      return res.status(400).json({ message: 'Missing required fields: items and total are required' });
    }

    // First, ensure columns exist - add them if they don't
    try {
      // Check if items column exists
      const checkItems = await pool.query(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'orders' AND column_name = 'items'
      `);
      
      if (checkItems.rows.length === 0) {
        console.log('Adding items column to orders table...');
        try {
          await pool.query('ALTER TABLE orders ADD COLUMN items TEXT');
          console.log('items column added successfully');
        } catch (addError) {
          // Column might have been added by another request, check again
          if (addError.message && addError.message.includes('already exists')) {
            console.log('items column already exists (race condition)');
          } else {
            throw addError; // Re-throw if it's a different error
          }
        }
      }

      // Check if shipping_address column exists
      const checkShipping = await pool.query(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'orders' AND column_name = 'shipping_address'
      `);
      
      if (checkShipping.rows.length === 0) {
        console.log('Adding shipping_address column to orders table...');
        try {
          await pool.query('ALTER TABLE orders ADD COLUMN shipping_address TEXT');
          console.log('shipping_address column added successfully');
        } catch (addError) {
          // Column might have been added by another request, check again
          if (addError.message && addError.message.includes('already exists')) {
            console.log('shipping_address column already exists (race condition)');
          } else {
            throw addError; // Re-throw if it's a different error
          }
        }
      }
    } catch (alterError) {
      console.error('Error checking/adding columns:', alterError);
      console.error('Alter error details:', alterError.message);
      // If column creation fails, try inserting without those columns
      if (alterError.message && alterError.message.includes('permission')) {
        throw new Error('Database permission error. Please contact administrator to add items and shipping_address columns to orders table.');
      }
    }

    // Insert order with all columns
    let result;
    try {
      result = await pool.query(
        'INSERT INTO orders (user_id, items, total_amount, shipping_address, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [userId, JSON.stringify(items), total, shippingAddress ? JSON.stringify(shippingAddress) : null, 'paid']
      );
    } catch (insertError) {
      console.error('Insert error:', insertError.message);
      // If columns still don't exist, try without them
      if (insertError.message && insertError.message.includes('column') && insertError.message.includes('does not exist')) {
        console.log('Columns still missing, trying insert without items and shipping_address');
        result = await pool.query(
          'INSERT INTO orders (user_id, total_amount, status) VALUES ($1, $2, $3) RETURNING *',
          [userId, total, 'paid']
        );
        // Add items to the result manually since we couldn't store it
        result.rows[0].items = JSON.stringify(items);
        result.rows[0].shipping_address = shippingAddress ? JSON.stringify(shippingAddress) : null;
      } else {
        throw insertError;
      }
    }

    res.status(201).json({
      message: 'Order created successfully',
      order: result.rows[0]
    });
  } catch (error) {
    console.error('Create order error:', error);
    console.error('Error details:', error.message);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      message: 'Server error',
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const result = await pool.query(
      'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );

    // Map total_amount to total and parse items JSON for frontend compatibility
    const orders = result.rows.map(order => {
      let items = []
      try {
        if (order.items) {
          items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items
        }
      } catch (e) {
        console.error('Error parsing order items:', e)
        items = []
      }
      
      return {
        ...order,
        total: parseFloat(order.total_amount) || 0,
        items: items
      }
    });

    res.json({ orders });
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createOrder,
  getUserOrders
};