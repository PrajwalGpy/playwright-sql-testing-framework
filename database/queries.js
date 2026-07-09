const { query } = require('./db');

async function getCustomerCount() {
  const result = await query('SELECT COUNT(*)::int AS count FROM customers');
  return result.rows[0].count;
}

async function getOrdersWithCustomers() {
  const result = await query(`
    SELECT o.order_id, c.full_name, o.order_status, o.created_at
    FROM orders o
    JOIN customers c ON c.customer_id = o.customer_id
    ORDER BY o.order_id
    LIMIT 10
  `);
  return result.rows;
}

async function getOrderSummary() {
  const result = await query(`
    SELECT
      c.full_name,
      COUNT(o.order_id) AS total_orders,
      COALESCE(SUM(p.amount), 0)::numeric(10,2) AS total_paid
    FROM customers c
    LEFT JOIN orders o ON o.customer_id = c.customer_id
    LEFT JOIN payments p ON p.order_id = o.order_id
    GROUP BY c.customer_id, c.full_name
    ORDER BY c.customer_id
  `);
  return result.rows;
}

module.exports = {
  getCustomerCount,
  getOrdersWithCustomers,
  getOrderSummary,
};
