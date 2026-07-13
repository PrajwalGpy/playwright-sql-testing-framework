const { test, expect } = require('@playwright/test');

const { executeQuery } = require('../database/db');

test('Expensive Orders', async () => {

    const result = await executeQuery(`

    WITH expensive_orders AS

    (

    SELECT *

    FROM payments

    WHERE amount>10000

    )

    SELECT *

    FROM expensive_orders;

    `);

    expect(result.rows.length).toBeGreaterThan(0);

});