const { test, expect } = require("@playwright/test");
const { executeQuery } = require("../database/db");
const { getCustomerById } = require("../database/queries");

test("Verify customer exists", async () => {
  const result = await executeQuery(getCustomerById, [1]);
  console.log(result)
  expect(result.rows.length).toBe(1);
  expect(result.rows[0].full_name).toBe("John Smith");
  expect(result.rows[0].email).toBe("john@gmail.com");
});
