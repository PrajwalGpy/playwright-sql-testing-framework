const { executeQuery } = require('./db');

const getCustomerById = `
SELECT * FROM customers WHERE customer_id = $1;
`;

const getOrders = `
SELECT * FROM orders;
`;

const getCompletedOrders = `
SELECT * FROM orders WHERE order_status = 'Completed';
`;

const paymentStatus = `
SELECT payment_status FROM payments WHERE order_id = $1;
`;


module.exports = {
  getCustomerById,
  getOrders,
  getCompletedOrders,
  paymentStatus,
};

