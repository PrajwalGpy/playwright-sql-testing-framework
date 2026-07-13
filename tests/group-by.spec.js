const { test, expect } = require("@playwright/test");
const { executeQuery } = require("../database/db");

test("Customer Order Count", async () => {
  const result = await executeQuery(`
    SELECT
    customer_id,
    COUNT(*) total_orders
    FROM orders
    GROUP BY customer_id
    ORDER BY customer_id;
    `);

    console.log(result)
  expect(result.rows.length).toBeGreaterThan(0);
});

 
