// Import MySQL connection.
const connection = require("../config/connection.js");

// ORM class for all our SQL statement functions.
class ORM {
  constructor(connection) {
    this.connection = connection;
  }

  selectLookups(table, columnName) {
    const queryString = "SELECT ?? FROM ??";
    return this.connection.query(queryString, [columnName, table]);
  }

  selectId(tableId, table, columnName, value) {
    const queryString = "SELECT ?? FROM ?? WHERE ?? = ?";
    return this.connection.query(queryString, [
      tableId,
      table,
      columnName,
      value,
    ]);
  }

  selectManagers() {
    const queryString =
      "SELECT DISTINCT m.first_name, m.last_name FROM employee e JOIN employee m on e.manager_id = m.emp_id";
    return this.connection.query(queryString, []);
  }

  insert(table, columns, values) {
    const queryString = `INSERT INTO ?? (${columns.join(
      ", "
    )}) VALUES (${table},${this.printQuestionMarks(values.length)})`;

    console.log(queryString);

    return this.connection.query(queryString, [table, ...values]);
  }
  printQuestionMarks(numberOfValues) {
    const questionMarks = [];

    for (var i = 0; i < numberOfValues; i++) {
      questionMarks.push("?");
    }

    return questionMarks.join(", ");
  }
}
module.exports = new ORM(connection);