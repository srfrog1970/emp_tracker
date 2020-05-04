const Prompts = require("./lib/prompts");
const inquirer = require("inquirer");
const orm = require("./config/orm.js");

async function getMainPrompt(callback) {
  continueLoop = true;
  // TODO: Why Doesn't this wait until the ".then" has finished?  Isnt it a part of the await?
  await inquirer.prompt(Prompts.getMainMenu()).then((inquirerResponses) => {
    mainRes = inquirerResponses.mainResponse;
    switch (mainRes) {
      case "Add departments":
        console.log("testsssssss");
        inquirer
          .prompt(Prompts.getAddDepartments())
          .then((addDepartmentsData) => {
            const departmentName = Object.values(addDepartmentsData);
            console.log(departmentName);
            orm
              .insert("department", "name", departmentName)
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
        break;
      case "Add employees":
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
        continueLoop = false;
        break;
    }
  });
  return continueLoop;
}
async function init() {
  var cnt = 1;
  do {
    console.log(cnt);
    await getMainPrompt();
    console.log(continueLoop);
    cnt += 1;
  } while (cnt < 4 && continueLoop);
}

init();
// console.log("Here");
