const mysql2 = require("mysql2");

const dbConnection = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT, // ✅ VERY IMPORTANT
  waitForConnections: true,
  connectionLimit: 10,
  connectTimeout: 10000,
});

module.exports = dbConnection.promise();
