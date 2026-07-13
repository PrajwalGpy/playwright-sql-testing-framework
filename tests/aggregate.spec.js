const { test, expect } = require("@playwright/test");
const { executeQuery } = require("../database/db");

test("Total payment amount", async () => {
  const result = await executeQuery(`
         SELECT SUM(amount) total
        FROM payments;`);
    expect(Number(result.rows[0].total)).toBeGreaterThan(100000);
});
