#!/bin/bash

# PostgreSQL Database Creation Script
# Run this on your Ubuntu server

# Set your PostgreSQL credentials
DB_NAME="xiselosafety"
DB_USER="postgres"  # Change if different
DB_PASSWORD=""      # Will prompt if not set

echo "Creating PostgreSQL database: $DB_NAME"

# Option 1: Using psql command line (if you have password in PGPASSWORD)
# PGPASSWORD=$DB_PASSWORD psql -U $DB_USER -h localhost -c "CREATE DATABASE $DB_NAME;"

# Option 2: Using sudo (if postgres user exists)
sudo -u postgres psql <<EOF
-- Create database
CREATE DATABASE $DB_NAME;

-- Connect to the database
\c $DB_NAME

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  category_id INTEGER REFERENCES categories(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample categories
INSERT INTO categories (name, description) VALUES
  ('Corporate Uniform', 'Professional corporate wear'),
  ('Protective Clothing', 'Safety and protective gear'),
  ('Hospitality Wear', 'Hospitality and service industry uniforms'),
  ('Security Clothing', 'Security personnel uniforms')
ON CONFLICT (name) DO NOTHING;

-- Insert sample products
INSERT INTO products (category_id, name, description, price, stock, image_url) VALUES
  (1, 'Hoodie', 'Warm corporate hoodie suitable for indoor and outdoor work', 19.99, 50, 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=600&h=600&fit=crop'),
  (2, 'Overall Jumpsuit', 'Full-body protective jumpsuit for industrial environments', 34.99, 10, 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=600&h=600&fit=crop'),
  (3, 'Shirt', 'Lightweight hospitality shirt for daily staff use', 24.99, 30, 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=600&fit=crop'),
  (4, 'Suit', 'Formal security suit designed for professional appearance.', 129.99, 25, 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=600&fit=crop')
ON CONFLICT DO NOTHING;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product ON order_items(product_id);

\q
EOF

echo "✅ Database '$DB_NAME' created successfully!"

