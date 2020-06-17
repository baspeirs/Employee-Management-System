const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "rootpass",
  database: "company_DB"
});

connection.connect(err => {
  if (err) throw err;
  console.log("Connected to database as id: " + connection.threadId + "\n");
  start();
});

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
        connection.end();
        break;
      }
    });
}

function viewDepartments() {
    console.log("View Department")
    connection.query("SELECT * FROM departments", (err, res) => {
      if (err) throw err;

      console.log(res);
      start();
    });
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
    inquirer.prompt({
      name: "newDep",
      type: "input",
      message: "What is the name of the new department?"
    }).then((response) => {
      console.log(response);
      connection.query("INSERT INTO departments SET ?", 
      {
        name: response.newDep
      }, 
      function(err, res) {
        if (err) throw err;

        console.log("Sucessfully input into table!")
        console.log(res)
        start();
      });
      
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
      console.log(answer)
      start();
    })
};

function addEmployee() {
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
      console.log(answer)
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