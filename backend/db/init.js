const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({
  user: process.env.DB_USER || 'xisekelo',
  host: process.env.DB_HOST || '10.0.0.65',
  database: process.env.DB_NAME || 'xisekelo',
  password: process.env.DB_PASSWORD || 'pass123',
  port: process.env.DB_PORT || 5432,
});

const { TLOU_CATEGORIES } = require('../data/tlou-catalog');
const { seedTlouCatalog } = require('./seed-tlou-catalog');

async function initDatabase() {
  try {
    for (const name of TLOU_CATEGORIES) {
      const existing = await pool.query('SELECT id FROM categories WHERE name = $1', [name]);
      if (existing.rows.length === 0) {
        await pool.query('INSERT INTO categories (name) VALUES ($1)', [name]);
        console.log(`Category created: ${name}`);
      }
    }

    // Insert demo users (assuming table structure exists)
    const adminPassword = await bcrypt.hash('admin123', 10);
    const customerPassword = await bcrypt.hash('pass123', 10);

    // Check if users exist first
    const existingAdmin = await pool.query('SELECT id FROM users WHERE email = $1', ['admin@fabric.com']);
    const existingCustomer = await pool.query('SELECT id FROM users WHERE email = $1', ['molepok@mogaleintegrated.co.za']);

    if (existingAdmin.rows.length === 0) {
      await pool.query(
        'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4)',
        ['Admin User', 'admin@fabric.com', adminPassword, 'admin']
      );
      console.log('Admin user created');
    }

    if (existingCustomer.rows.length === 0) {
      await pool.query(
        'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4)',
        ['Customer User', 'molepok@mogaleintegrated.co.za', customerPassword, 'customer']
      );
      console.log('Customer user created');
    }

    await seedTlouCatalog(pool);
    console.log('Database initialization completed');
  } catch (error) {
    console.error('Database initialization error:', error);
  } finally {
    await pool.end();
  }
}

initDatabase();