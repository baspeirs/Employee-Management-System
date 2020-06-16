const inquirer = require("inquirer");
const mysql = require("mysql");

// lets start inquirer first, we have 9 questions to ask

function start() {
    inquirer
    .prompt({
      name: "initialQuestion",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add department",
        "Add role",
        "Add Employee",
        "Remove department",
        "Remove role",
        "Remove employee",
        "exit"
      ]
    })
    .then(function(answer) {
      switch (answer.initialQuestion) {
      case "View all departments":
        viewDepartments();
        break;

      case "View all roles":
        viewRoles();
        break;

      case "View all employees":
        viewEmployees();
        break;

      case "Add department":
        addDepartment();
        break;

      case "Add role":
        addRole();
        break;

      case "Add Employee":
        addEmployee();
        break;

      case "Remove department":
        removeDepartment();
        break;

      case "Remove role":
        removeRole();
        break;

      case "Remove employee":
        removeEmployee();
        break;

      case "exit":
        console.log("Goodbye!")
        break;
      }
    });
}

function viewDepartments() {
    console.log("View Department")
    start();
};

function viewRoles() {
    console.log("View Role")
    start();
};

function viewEmployees() {
    console.log("View Employee")
    start();
};

function addDepartment() {
    console.log("Add Department")
    inquirer.prompt({
      name: "newDep",
      type: "input",
      message: "What is the name of the new department?"
    }).then(answer => {
      console.log(answer.newDep);
      start();
    })
    
};

function addRole() {
    console.log("Add Role")
    inquirer.prompt([
      {
        name: "newTitle",
        type: "input",
        message: "What is the title of the new role?"
      },
      {
        name: "newSalary",
        type: "input",
        message: "What is the salary for this role?"
      },
      {
        name: "whatDepartment",
        type: "input",
        message: "What department does the role belong to? (will require a list of departments later)"
      }],
      ).then(answer => {
      console.log(answer.newTitle);
      console.log(answer.newSalary);
      console.log(answer.whatDepartment);
      start();
    })
};

function addEmployee() {
    console.log("Add Employee")
    inquirer.prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the FIRST name of the new employee?"
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the LAST name of the new employee?"
      },
      {
        name: "whatDepartment",
        type: "input",
        message: "What department does the new employee belong to? (will require a list of departments later)"
      },
      {
        name: "whatRole",
        type: "input",
        message: "What role does the new employee have? (will require a list of departments later)"
      }]
      ).then(answer => {
      console.log(answer.firstName);
      console.log(answer.lastName);
      console.log(answer.whatDepartment);
      console.log(answer.whatRole)
      start();
      });
};

function removeDepartment() {
    console.log("Remove Department")
    start();
};

function removeRole() {
    console.log("Remove Role")
    start();
};

function removeEmployee() {
    console.log("Remove Employee")
    start();
};

start();