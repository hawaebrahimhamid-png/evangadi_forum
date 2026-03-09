const mysql2 = require("mysql2");

const dbConnection = mysql2.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: 10,
});

module.exports = dbConnection.promise();
