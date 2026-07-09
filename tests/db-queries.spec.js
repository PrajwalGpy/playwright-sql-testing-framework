const { test, expect } = require('@playwright/test');
const { getCustomerCount, getOrdersWithCustomers, getOrderSummary } = require('../database/queries');

test('customers table is reachable', async () => {
  const count = await getCustomerCount();
  expect(typeof count).toBe('number');
  expect(count).toBeGreaterThanOrEqual(0);
});

test('orders can be joined with customers', async () => {
  const rows = await getOrdersWithCustomers();
  expect(Array.isArray(rows)).toBeTruthy();
  expect(rows.length).toBeGreaterThanOrEqual(0);
});

test('order summary query returns rows', async () => {
  const rows = await getOrderSummary();
  expect(Array.isArray(rows)).toBeTruthy();
});
