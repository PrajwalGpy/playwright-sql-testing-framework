const { test, expect } = require("@playwright/test");
const { executeQuery } = require("../database/db");

test("Validate Join", async () => {
  const result = await executeQuery(`
        SELECT
            c.full_name,
            o.order_id,
            p.amount
        FROM customers c
        JOIN orders o
        ON c.customer_id=o.customer_id
        JOIN payments p
        ON o.order_id=p.order_id
        WHERE o.order_id=1;
    `);
  expect(result.rows[0].full_name).toBe("John Smith");
  expect(result.rows[0].amount).toBe("65800.00");
});
