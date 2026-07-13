const { test, expect } = require("@playwright/test");

const { executeQuery } = require("../database/db");

test("highest_payment_by_method", async () => {
  const result = await executeQuery(`      
            SELECT
                *
            FROM
                (
                    SELECT
                        P.ORDER_ID,
                        P.AMOUNT,
                        P.PAYMENT_METHOD,
                        ROW_NUMBER() OVER (
                            PARTITION BY
                                P.PAYMENT_METHOD
                            ORDER BY
                                P.AMOUNT DESC
                        ) AS RANK
                    FROM
                        PAYMENTS AS P
                ) AS P
            WHERE
                RANK = 1;
`);
  expect(result.rows.length).toBe(5);
});
