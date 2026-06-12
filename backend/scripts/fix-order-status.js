const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'xisekelo',
  host: process.env.DB_HOST || '10.0.0.65',
  database: process.env.DB_NAME || 'xisekelo',
  password: process.env.DB_PASSWORD || 'pass123',
  port: process.env.DB_PORT || 5432,
});

pool
  .query("UPDATE orders SET status = 'pending' WHERE status = 'paid'")
  .then((r) => {
    console.log(`Updated ${r.rowCount} order(s) to pending`);
    return pool.end();
  })
  .catch((e) => {
    console.error(e);
    pool.end();
    process.exit(1);
  });
