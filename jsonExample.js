const Prompts = require("./lib/prompts");
const inquirer = require("inquirer");
const orm = require("./config/orm.js");

const selectRole = await orm.selectId("role_id", "role", "title", role);
// our response  These mean the same thing.
console.log("selectRole ", selectRole);
console.log("Object.values", Object.values(selectRole));
// Changed our response into a string
test1 = JSON.stringify(selectRole);
console.log("test1 ", test1, "typeof", typeof test1);
// Changed our string into a javascript object.
test2 = JSON.parse(test1);
console.log("test2 ", test2, "typeof", typeof test2);
// all in one
test3 = JSON.parse(JSON.stringify(selectRole));
console.log("test2 ", test3, "typeof", typeof test3);
