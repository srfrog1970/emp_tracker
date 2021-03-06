// Set up MySQL connection.
const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "emptrackerdb",
});

// Make connection.
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
});

connection.query = util.promisify(connection.query);

// Export connection for our ORM to use.
module.exports = connection;
