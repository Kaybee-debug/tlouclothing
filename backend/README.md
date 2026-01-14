# Xisekelo Safety Backend

Backend API for Xisekelo Safety e-commerce application.

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and update with your PostgreSQL credentials:

```bash
cp .env.example .env
```

Edit `.env`:
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=xiselosafety
PORT=3003
```

### 3. Create Database

Run the database initialization script:

```bash
npm run db:init
```

This will:
- Create the `xiselosafety` database (if it doesn't exist)
- Create all necessary tables (products, categories, users, orders, order_items)
- Insert sample data

### 4. Start Server

```bash
npm run dev
```

The server will run on `http://localhost:3003`

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/` - Welcome message

## Database Schema

- **categories** - Product categories
- **products** - Product catalog
- **users** - User accounts
- **orders** - Customer orders
- **order_items** - Order line items

