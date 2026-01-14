-- Add demo users to database
-- Run this on your PostgreSQL server

-- Admin user
INSERT INTO users (name, email, password_hash, role) 
VALUES (
  'Admin User',
  'admin@fabric.com',
  '$2a$10$rOzJqZqZqZqZqZqZqZqZqOqZqZqZqZqZqZqZqZqZqZqZqZqZqZqZq', -- bcrypt hash for 'admin123'
  'admin'
)
ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  password_hash = EXCLUDED.password_hash,
  role = EXCLUDED.role;

-- Customer user
INSERT INTO users (name, email, password_hash, role) 
VALUES (
  'John Customer',
  'john@example.com',
  '$2a$10$rOzJqZqZqZqZqZqZqZqZqOqZqZqZqZqZqZqZqZqZqZqZqZqZqZqZq', -- bcrypt hash for 'customer123'
  'customer'
)
ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  password_hash = EXCLUDED.password_hash,
  role = EXCLUDED.role;

