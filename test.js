const Prompts = require("./lib/prompts");
const inquirer = require("inquirer");
const orm = require("./config/orm.js");

async function getMenus() {
  let mainRes = await inquirer.prompt(Prompts.getMainMenu());
  let continueLoop = await getSubMenu(mainRes.mainResponse);
  return continueLoop;
}

async function init() {
  var cnt = 1;
  do {
    //   TODO: I had let here.  However, since I need it outside the do block, it becomes undefined.
    var continueLoop = await getMenus();
    cnt += 1;
    console.log("Loop cnt: ", cnt);
  } while (cnt < 20 && continueLoop);
}

init();

async function getSubMenu(mainRes) {
  var continueLoop = true;
  switch (mainRes) {
    case "Add departments":
      const addDepartmentsData = await inquirer.prompt(
        Prompts.getAddDepartments()
      );
      const departmentName = Object.values(addDepartmentsData);
      orm.insert("department", "name", departmentName);

      break;
    case "Add roles":
      const addRolesData = await inquirer.prompt(Prompts.getAddRoles());
      const selectData = await orm.selectId(
        "dept_id",
        "department",
        "name",
        addRolesData.roleDepartment
      );
      dept_id = Object.values(JSON.parse(JSON.stringify(selectData)))[0]
        .dept_id;
      var roleData = [addRolesData.roleTitle, addRolesData.roleSalary, dept_id];
      orm.insert("role", ["title, salary", "dept_id"], roleData);
      break;
    case "Add employees":
      const addEmployeeData = await inquirer.prompt(Prompts.getAddEmployees());
      employeeData = Object.values(JSON.parse(JSON.stringify(addEmployeeData)));
      first_name = employeeData[0];
      last_name = employeeData[1];
      role = employeeData[2];
      manager = employeeData[3];
      manager_first_name = manager.split(" ")[0];
      manager_last_name = manager.split(" ")[1];
      // Select manager and get id
      const selectManager = await orm.findManager(
        manager_first_name,
        manager_last_name
      );
      //   console.log("selectManager ", selectManager);
      managerResults = JSON.parse(JSON.stringify(selectManager));
      //   console.log(managerResults[0].emp_id);
      // Select role and get id
      const selectRole = await orm.selectId("role_id", "role", "title", role);
      roleResults = JSON.parse(JSON.stringify(selectRole));
      //   console.log(roleResults[0].role_id);
      // Set employee data
      employeeData = [
        first_name,
        last_name,
        roleResults[0].role_id,
        managerResults[0].emp_id,
      ];
      orm.insert(
        "employee",
        ["first_name", "last_name", "role_id", "manager_id"],
        employeeData
      );
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
  return continueLoop;
}
