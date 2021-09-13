const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');

const startEmployeeTracker = () => {
    console.log(`
    =================
    Welcome To Employee Tracker! 
    =================
    `);
    return inquirer.prompt({
        type:'list',
        name:'options',
        message:'What would you like to do?',
        choices: ['View All Departments','View All Roles','View All Employees','Add a Department','Add a Role','Add an Employee','Update Employee Role']
    }).then(res =>{
        switch(res.options){
            case 'View All Departments':
                viewDepartment();
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'View All Employees':
                viewEmployees();
                break;
            case 'Add a Department':
                addDepartment();
                break;
            case 'Add a Role':
                addRole();
                break;
            case 'Add an Employee':
                addEmployee();
                break;
            case 'Update Employee Role':
                updateRole();
                break;
        }
    })
};

const viewDepartment = () => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.table(result);
        startEmployeeTracker();
    });
};

const viewRoles = () => {
    const sql = `SELECT * FROM roles`;
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.table(result);
        startEmployeeTracker();
    });
};

const viewEmployees = () => {
    const sql = `SELECT employee.*, roles.title
                AS job_title
                FROM employee
                LEFT JOIN roles ON employee.role_id = roles.id
                LEFT JOIN department ON roles.department_id = department.id
                LEFT JOIN employee AS manager ON employee.manager_id = manager.id`;
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.table(result);
        startEmployeeTracker();
    });

};

const addDepartment = () => {
    inquirer.prompt({
        name:'department_name',
        type:'input',
        message:'What is the name of the Department you would like to add?'
    }).then(res =>{
        const sql =`INSERT INTO department(name)
                    VALUES (?)`;
        const params = [res.department_name];
        db.query(sql, params, (err, result) => {
            if (err) throw err;
            console.log('The Department has been added');

            db.query(`SELECT * FROM department`, (err, result) => {
                if (err) {
                    return;
                }
                console.table(result);
                startEmployeeTracker();
            });
        });
    });
};

const addRole = () => {
    inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'What Role Would You Like to Add to the Database?'
        },
        {
            name: 'salary',
            type: 'input',
            message: 'How Much Is the Salary For this Job Role? (no commas or periods)'
        },
        {
            name: 'department_id',
            type: 'input',
            message: 'Please Enter the Department ID the Role should belong to:'
        }
    ]).then(function (response) {
        const sql =`INSERT INTO roles (title,salary,department_id) VALUES (?,?,?)`;
        const params = [response.title, response.salary, response.department_id];
        db.query(sql,params, (err, result) => {
            if (err) throw (err);
            console.log('The new role has been created.');
            db.query(`SELECT * FROM roles`, (err, result) => {
                if (err) {
                    return;
                }
                console.table(result);
                startEmployeeTracker();
            });
        });
    });
};

const addEmployee = () => {
    inquirer.prompt([
        {
            name: 'first_name',
            type: 'input',
            message: 'Please Enter the First Name of the New Employee'
        },
        {
            name: 'last_name',
            type: 'input',
            message: 'Please Enter the Last Name of the New Employee'
        },
        {
            name: 'role_id',
            type: 'number',
            message: 'Please Enter the Role ID Number the New Employee Should Belong To:'
        },
        {
            name: 'manager_id',
            type: 'number',
            message: "Please Enter the ID Number of the Manager the New Employee Would Be Reporting To:"
        },
    ]).then(function (response) {
        const sql =`INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)`;
        const params = [response.first_name, response.last_name, response.role_id, response.manager_id];
        db.query(sql, params, (err, res) => {
            if (err) throw (err);
            console.log('The new employee has been created');
            db.query(`SELECT * FROM employee`, (err, result) => {
                if (err) {
                    return;
                }
                console.table(result);
                startEmployeeTracker();
            });
        });
    });
};

const updateRole = () => {};

startEmployeeTracker();