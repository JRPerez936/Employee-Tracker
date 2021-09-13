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

const addEmployee = () => {};

const updateRole = () => {};

startEmployeeTracker();