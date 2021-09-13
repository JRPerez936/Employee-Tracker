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
                viewEmployees;
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
    });
};

const viewRoles = () => {
    const sql = `SELECT * FROM roles`;
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.table(result);
    });
};

const viewEmployees = () => {};

const addDepartment = () => {};

const addRole = () => {};

const addEmployee = () => {};

const updateRole = () => {};

startEmployeeTracker();