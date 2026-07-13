const { test, expect } = require("@playwright/test");

const { executeQuery } = require("../database/db");

test("Verify payment status", async () => {
  const result =await executeQuery(`
            SELECT * FROM payments WHERE order_id=1;
            `);
  expect(result.rows[0].payment_status).toBe("Paid");
});
