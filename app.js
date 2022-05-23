const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

// creates connection to sql database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "F33n1x3356!",
  database: "employees_db",
});

// connects to sql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  options();
});

// prompts user with list of options to choose from
function options() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Welcome to our employee database! What would you like to do?",
      choices: [
        "View employees",
        "View departments",
        "View all roles",
        "Add a new employee",
        "Add a new department",
        "Add a new role",
        "Update employee role",
        "Delete an employee",
        "EXIT",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View employees":
          viewEmployees();
          break;
        case "View departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "Add a new employee":
          addEmployee();
          break;
        case "Add a new department":
          addDepartment();
          break;
        case "Add a new role":
          addRole();
          break;
        case "Update employee role":
          updateRole();
          break;
        case "Delete an employee":
          deleteEmployee();
          break;
        case "EXIT":
          exitApp();
          break;
        default:
          break;
      }
    });
}

// view every employees in the database
function viewEmployees() {
  var query = "SELECT * FROM employee";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log(res.length + " this employee has been found.");
    console.table("All Employees:", res);
    options();
  });
}

// view all departments in the database
function viewDepartments() {
  var query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table("All Departments:", res);
    options();
  });
}

// view all roles in the database
function viewRoles() {
  var query = "SELECT * FROM role";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table("All Roles:", res);
    options();
  });
}

// add an employee to the database
function addEmployee() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "first_name",
          type: "input",
          message: "Please enter the employee's first name: ",
        },
        {
          name: "last_name",
          type: "input",
          message: "Please enter the employee's last name: ",
        },
        {
          name: "manager_id",
          type: "input",
          message: "Please enter the manager's ID: ",
        },
        {
          name: "role",
          type: "list",
          choices: function () {
            var roleArray = [];
            for (let i = 0; i < res.length; i++) {
              roleArray.push(res[i].title);
            }
            return roleArray;
          },
          message: "What is the role of this employee? ",
        },
      ])
      .then(function (answer) {
        let role_id;
        for (let i = 0; i < res.length; i++) {
          if (res[i].title == answer.role) {
            role_id = res[i].id;
            console.log(role_id);
          }
        }
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
            manager_id: answer.manager_id,
            role_id: role_id,
          },
          function (err) {
            if (err) throw err;
            console.log("Congrats! The employee has been added!");
            options();
          }
        );
      });
  });
}

// add a department to the database
function addDepartment() {
  inquirer
    .prompt([
      {
        name: "newDepartment",
        type: "input",
        message: "Please enter the name of the new department: ",
      },
    ])
    .then(function (answer) {
      connection.query("INSERT INTO department SET ?", {
        name: answer.newDepartment,
      });
      var query = "SELECT * FROM department";
      connection.query(query, function (err, res) {
        if (err) throw err;
        console.log("Your department has been added!");
        console.table("All Departments:", res);
        options();
      });
    });
}

// add a role to the database
function addRole() {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "new_role",
          type: "input",
          message: "Enter the name of the new role: ",
        },
        {
          name: "salary",
          type: "input",
          message: "Enter the salary for this role (ex: $89,000): ",
        },
        {
          name: "Department",
          type: "list",
          choices: function () {
            var deptArry = [];
            for (let i = 0; i < res.length; i++) {
              deptArry.push(res[i].name);
            }
            return deptArry;
          },
        },
      ])
      .then(function (answer) {
        let department_id;
        for (let i = 0; i < res.length; i++) {
          if (res[i].name == answer.Department) {
            department_id = res[i].id;
          }
        }

        connection.query(
          "INSERT INTO role SET ?",
          {
            title: answer.new_role,
            salary: answer.salary,
            department_id: department_id,
          },
          function (err, res) {
            if (err) throw err;
            console.log("Your new role has been added!");
            console.table("All Roles:", res);
            options();
          }
        );
      });
  });
}

// update a role in the database
function updateRole() {}

//  delete an employee
function deleteEmployee() {}

// exit the app
function exitApp() {
  connection.end();
}
