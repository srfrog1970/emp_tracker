const Department = require("./lib/Department");
const Employee = require("./lib/Employee");
const Role = require("./lib/Role");
const inquirer = require("inquirer");
const util = require("util");
const Prompts = require("./lib/prompts");

const connection = require("./config/connection.js");
const orm = require("./config/orm.js");

// loop

inquirer
  .prompt(Prompts.getMainMenu())
  .then((inquirerResponses) => {
    mainRes = inquirerResponses.mainResponse;
    switch (mainRes) {
      case "Add departments":
        inquirer
          .prompt(Prompts.getAddDepartments())
          .then((inquirerResponses) => {
            const deptArray = Object.values(inquirerResponses);
            console.log(deptArray);
            orm
              .insert("department", "name", deptArray)
              .then((results) => {
                if (results.affectedRows === 0) {
                  return console.log("Nothing updated!");
                }
                return console.log("Updated!");
              })
              .catch((err) => console.log(err));
          });
        break;

      case "Add roles":
        inquirer
          .prompt(Prompts.getAddRoles())
          .then(({ roleTitle, roleSalary, roleDepartment }) => {
            // id, table, fk_id, value
            orm
              .selectId("dept_id", "department", "name", roleDepartment)
              .then((results) => {
                if (results.affectedRows === 0) {
                  return console.log("Error on lookup");
                }
                results = results[0].dept_id;

                roleData = [roleTitle, roleSalary, results];

                orm
                  .insert("role", ["title, salary", "dept_id"], roleData)
                  .then((results) => {
                    if (results.affectedRows === 0) {
                      return console.log("Nothing updated!");
                    }
                    return console.log("Updated!");
                  })
                  .catch((err) => console.log(err));
              });
          });
        break;

      case "Add employees":
        inquirer
          .prompt(Prompts.getAddEmployees())
          .then((inquirerResponses) => {});
        break;

      case "View departments":
        break;

      case "View roles":
        break;

      case "View employees":
        break;

      case "Update employee":
        break;

      case "Update roles":
        break;

      default:
        break;
    }
  })
  .catch((err) => {});

function addDepartments() {
  inquirer
    .prompt(Prompts.getAddDepartments())
    .then((inquirerResponses) => {})
    .catch((err) => {});
}

function addRoles() {
  inquirer
    .prompt(Prompts.getAddRoles())
    .then((inquirerResponses) => {})
    .catch((err) => {});
}

function addEmployees() {}

function viewDepartments() {}

function viewRoles() {}

function viewEmployees() {}

function updateEmployee() {}

function updateRoles() {}
