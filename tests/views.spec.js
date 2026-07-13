const { test, expect } = require('@playwright/test');

const { executeQuery } = require('../database/db');

test('Completed Orders View', async () => {

    const result = await executeQuery(`

    SELECT *

    FROM completed_orders;

    `);

    expect(result.rows.length).toBeGreaterThan(0);

});