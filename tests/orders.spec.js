const { test, expect } = require("@playwright/test");
const { executeQuery } = require("../database/db");

test("Verify order exists", async () => {
  const result = await executeQuery(`
        SELECT *
        FROM orders
        WHERE order_id=1;
        `);
  expect(result.rows.length).toBe(1);

  expect(result.rows[0].order_status).toBe("Completed");
});
