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

      res.forEach(element => console.log(element.department_id + " | " + element.name));
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
    }).then((answer) => {
      console.log(answer);
      connection.query("INSERT INTO departments SET ?", 
      {
        name: answer.newDep
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
    connection.query("SELECT * FROM departments", (err, data) => {
      if (err) throw err;
      console.log(data);
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
          type: "list",
          message: "What department does the role belong to?",
          choices: data
        }],
        ).then((answer) => {
          let depId;
          data.forEach(element => {
            if (element.name === answer.whatDepartment) {
              depId = element.department_id;
            }
          });
          connection.query("INSERT INTO roles SET ?", 
          {
            title: answer.newTitle,
            salary: answer.newSalary,
            department_id: depId
          })
        start();
      });
    }) 
};

function addEmployee() {
  connection.query("SELECT * FROM roles", (err, data) => {
    if (err) throw err;
    console.log(data)
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
        name: "whatRole",
        type: "list",
        message: "What role does the new employee have?",
        choices: function() {
          let roleArray = []
          data.forEach(element => {
            roleArray.push(element.title);
          })
          return roleArray
        }
      }]
      ).then(answer => {
      // console.log(answer)
      data.forEach(element => {
        let empRoleId;
        if (element.title === answer.whatRole) {
          // ===== this needs to be fixed when the server is reset ======
          empRoleId = element.role_id
          console.log(empRoleId);
          connection.query("INSERT INTO employees SET ?", 
        {
          firstname: answer.firstName,
          lastname: answer.lastName,
          role_id: empRoleId
        },
        (err, result) => {
          if (err) throw err;
          console.log("Successfully added " + answer.firstName + " " + answer.lastName);
          console.log(result);
          start();
        }) 
        }
      });
      });
  })
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