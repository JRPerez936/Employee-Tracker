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
        choices: ['View All Departments','View All Roles','View All Employees','Add a Department','Add a Role','Add a Employee','Update Employee Role']
    });
};

const viewDepartment = () => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.table(result);
    });
};

const viewRoles = () => {};

const viewEmployees = () => {};

const addDepartment = () => {};

const addRole = () => {};

const addEmployee = () => {};

const updateRole = () => {};