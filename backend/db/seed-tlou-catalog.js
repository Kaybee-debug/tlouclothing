const { Pool } = require('pg');
const { TLOU_CATEGORIES, LEGACY_CATEGORIES, tlouCatalog } = require('../data/tlou-catalog');

const pool = new Pool({
  user: process.env.DB_USER || 'xisekelo',
  host: process.env.DB_HOST || '10.0.0.65',
  database: process.env.DB_NAME || 'xisekelo',
  password: process.env.DB_PASSWORD || 'pass123',
  port: process.env.DB_PORT || 5432,
});

async function ensureCategory(client, name) {
  let result = await client.query('SELECT id FROM categories WHERE name = $1', [name]);
  if (result.rows.length === 0) {
    result = await client.query('INSERT INTO categories (name) VALUES ($1) RETURNING id', [name]);
  }
  return result.rows[0].id;
}

async function seedTlouCatalog(db = pool) {
  const client = await db.connect();
  try {
    await client.query('BEGIN');

    for (const name of TLOU_CATEGORIES) {
      await ensureCategory(client, name);
    }

    const existingTlou = await client.query(
      `SELECT COUNT(*)::int AS count FROM products p
       JOIN categories c ON p.category_id = c.id
       WHERE c.name = ANY($1::text[])`,
      [TLOU_CATEGORIES]
    );

    if (existingTlou.rows[0].count >= tlouCatalog.length) {
      await client.query('COMMIT');
      console.log(`T.L.O.U. catalog already up to date (${existingTlou.rows[0].count} products)`);
      return { count: existingTlou.rows[0].count, skipped: true };
    }

    const urlResult = await client.query(
      `SELECT image_url FROM products WHERE image_url LIKE '/tlou_%'`
    );
    const existingUrls = new Set(urlResult.rows.map((r) => r.image_url));
    let pending = tlouCatalog.filter((item) => !existingUrls.has(item.image_url));

    const legacyRows = await client.query(
      `SELECT p.id FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE c.name = ANY($1::text[]) OR c.name IS NULL
       ORDER BY p.id ASC`,
      [LEGACY_CATEGORIES]
    );

    for (const row of legacyRows.rows) {
      if (pending.length === 0) break;
      const item = pending.shift();
      const categoryId = await ensureCategory(client, item.category);
      await client.query(
        `UPDATE products
         SET name = $1, description = $2, category_id = $3, price = $4, stock = $5, image_url = $6
         WHERE id = $7`,
        [item.name, item.description, categoryId, item.price, item.stock, item.image_url, row.id]
      );
      existingUrls.add(item.image_url);
    }

    for (const item of pending) {
      if (existingUrls.has(item.image_url)) continue;
      const categoryId = await ensureCategory(client, item.category);
      await client.query(
        `INSERT INTO products (name, description, category_id, price, stock, image_url)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [item.name, item.description, categoryId, item.price, item.stock, item.image_url]
      );
      existingUrls.add(item.image_url);
    }

    await client.query('COMMIT');
    const finalCount = existingUrls.size;
    console.log(`T.L.O.U. catalog ready — ${finalCount} products`);
    return { count: finalCount };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

if (require.main === module) {
  seedTlouCatalog(pool)
    .then(() => pool.end())
    .catch((err) => {
      console.error('Seed failed:', err);
      pool.end();
      process.exit(1);
    });
}

module.exports = { seedTlouCatalog };
