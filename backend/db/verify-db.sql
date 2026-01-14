-- Verification queries to check database setup
-- Run: sudo -u postgres psql -d xiselosafety -f verify-db.sql

-- List all tables
\dt

-- Check categories
SELECT * FROM categories;

-- Check products
SELECT id, name, price, stock, category_id FROM products;

-- Check table structures
\d categories
\d products
\d users
\d orders
\d order_items

-- Count records
SELECT 'categories' as table_name, COUNT(*) as count FROM categories
UNION ALL
SELECT 'products', COUNT(*) FROM products
UNION ALL
SELECT 'users', COUNT(*) FROM users
UNION ALL
SELECT 'orders', COUNT(*) FROM orders
UNION ALL
SELECT 'order_items', COUNT(*) FROM order_items;

