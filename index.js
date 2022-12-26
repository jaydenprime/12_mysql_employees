// Packages required
const inquirer = require('inquirer');
const mysql = require('mysql2');

// Connects to mySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Maganda@24',
  database: 'employee_db'
});

connection.connect();

// Display the prompt
function displayMenu() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role'
      ]
    }
  ]).then(answers => {
    switch (answers.choice) {
      case 'View all departments':
        viewDepartments();
        break;
      case 'View all roles':
        viewRoles();
        break;
      case 'View all employees':
        viewEmployees();
        break;
      case 'Add a department':
        addDepartment();
        break;
      case 'Add a role':
        addRole();
        break;
      case 'Add an employee':
        addEmployee();
        break;
      case 'Update an employee role':
        updateEmployeeRole();
        break;
    }
  });
}

// View all departments
function viewDepartments() {
  connection.query('SELECT * FROM department', (error, results) => {
    if (error) throw error;

    console.log('DEPARTMENTS:');
    console.table(results);

    displayMenu();
  });
}

// View all roles
function viewRoles() {
  connection.query(
    'SELECT role.id, role.title, department.name AS department, role.salary FROM role INNER JOIN department ON role.department_id = department.id',
    (error, results) => {
      if (error) throw error;

      console.log('ROLES:');
      console.table(results);

      displayMenu();
    }
  );
}

// View all employees
function viewEmployees() {
  connection.query(
    'SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, department.name AS department, role.salary, employee.manager_id FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id',
    (error, results) => {
      if (error) throw error;

      console.log('EMPLOYEES:');
      console.table(results);

      displayMenu();
    }
  );
}

// Add department
function addDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the name of the department:'
    }
  ]).then(answers => {
    connection.query(
      'INSERT INTO department SET ?',
      {
        name: answers.name
      },
      (error) => {
        if (error) throw error;
        console.log('Department added successfully!');
        displayMenu();
      }
    );
  });
}

// Add role
function addRole() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of the role:'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary for the role:',
      validate: (value) => {
        if (!isNaN(value)) return true;
        return 'Please enter a valid number';
      }
    },
    {
      type: 'input',
      name: 'department_id',
      message: 'Enter the department ID for the role:',
      validate: (value) => {
        if (!isNaN(value)) return true;
        return 'Please enter a valid number';
      }
    }
  ]).then(answers => {
    connection.query(
      'INSERT INTO role SET ?',
      {
        title: answers.title,
        salary: answers.salary,
        department_id: answers.department_id
      },
      (error) => {
        if (error) throw error;
        console.log('Role added successfully!');
        displayMenu();
      }
    );
  });
}

// Add employee
function addEmployee() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'first_name',
        message: 'Enter the first name of the employee:'
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'Enter the last name of the employee:'
      },
      {
        type: 'input',
        name: 'role_id',
        message: 'Enter the role ID for the employee:',
        validate: (value) => {
          if (!isNaN(value)) return true;
          return 'Please enter a valid number';
        }
      },
      {
        type: 'input',
        name: 'manager_id',
        message: 'Enter the manager ID for the employee (leave blank if the employee has no manager):',
        default: null
      }
    ]).then(answers => {
      connection.query(
        'INSERT INTO employee SET ?',
        {
          first_name: answers.first_name,
          last_name: answers.last_name,
          role_id: answers.role_id,
          manager_id: answers.manager_id
        },
        (error) => {
          if (error) throw error;
          console.log('Employee added successfully!');
          displayMenu();
        }
      );
    });
  }

  // Update employee role
  function updateEmployeeRole() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'employee_id',
        message: 'Enter the ID of the employee whose role you want to update:',
        validate: (value) => {
          if (!isNaN(value)) return true;
          return 'Please enter a valid number';
        }
      },
      {
        type: 'input',
        name: 'role_id',
        message: 'Enter the new role ID for the employee:',
        validate: (value) => {
          if (!isNaN(value)) return true;
          return 'Please enter a valid number';
        }
      }
    ]).then(answers => {
      connection.query(
        'UPDATE employee SET role_id = ? WHERE id = ?',
        [answers.role_id, answers.employee_id],
        (error) => {
          if (error) throw error;
          console.log('Employee role updated successfully!');
          displayMenu();
        }
      );
    });
  }

  // Initialize function
  displayMenu();