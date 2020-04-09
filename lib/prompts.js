const orm = require("../config/orm.js");
// const connection = require("../config/connection.js");

class Prompts {
  constructor() {}

  getMainMenu() {
    var currPrompts = [
      {
        type: "list",
        name: "mainResponse",
        message: "What would you like to do?",
        choices: [
          "Add departments",
          "Add roles",
          "Add employees",
          "View departments",
          "View roles",
          "View employees",
          "Update employee",
          "Update roles",
        ],
      },
    ];
    return currPrompts;
  }

  getAddDepartments() {
    var currPrompts = [
      {
        type: "input",
        name: "department",
        message: "Enter in a new Department: ",
      },
    ];
    return currPrompts;
  }

  getAddRoles() {
    var deptChoices = getDeptChoices();
    var currPrompts = [
      {
        type: "input",
        name: "roleTitle",
        message: "Enter in a new role Title: ",
      },
      {
        type: "input",
        name: "roleSalary",
        message: "Enter in a new role Salary: ",
      },
      {
        type: "list",
        name: "roleDepartment",
        message: "Enter in a new role Department: ",
        choices: deptChoices,
      },
    ];
    return currPrompts;
  }

  getAddEmployees() {
    var managerChoices = getManagerChoices();
    var roleChoices = getRoleChoices();
    var currPrompts = [
      {
        type: "input",
        name: "empFirstName",
        message: "Enter new employee First Name: ",
      },
      {
        type: "input",
        name: "empLastName",
        message: "Enter new employee Last Name: ",
      },
      {
        type: "list",
        name: "addEmpRoles",
        message: "Choose employee's role: ",
        choices: roleChoices,
      },
      {
        type: "list",
        name: "addEmpManager",
        message: "Choose employee's manager: ",
        choices: managerChoices,
      },
    ];
    return currPrompts;
  }
}

function getManagerChoices() {
  choiceList = [];
  orm
    .selectManagers()
    .then((results) => {
      const values = Object.values(results);
      for (const value of values) {
        fullName = value.first_name + " " + value.last_name;
        choiceList.push(fullName);
      }
    })
    .catch((err) => console.log(err));
  return choiceList;
}
function getRoleChoices() {
  choiceList = [];
  orm
    .selectLookups("role", "title")
    .then((results) => {
      const values = Object.values(results);
      for (const value of values) {
        choiceList.push(value.title);
      }
    })
    .catch((err) => console.log(err));
  return choiceList;
}
function getDeptChoices() {
  choiceList = [];
  orm
    .selectLookups("department", "name")
    .then((results) => {
      const values = Object.values(results);
      for (const value of values) {
        choiceList.push(value.name);
      }
    })
    .catch((err) => console.log(err));
  return choiceList;
}

module.exports = new Prompts();
