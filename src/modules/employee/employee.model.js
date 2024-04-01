let response = require('../../responses');
let knex = require('../../../config/knex');
let config = require('../../../config/config');

module.exports = class departmentModel {
    constructor() { }

    getAllEmployee(data) {
        let cols = {
            emp_id: 'emp_id',
            emp_name: 'emp_name',
            phone: 'phone',
            email: 'email',
            deptId: 'deptId',
            gender: 'gender',
            role: 'role',
        }
        return knex.select(cols).from('employee');
    }
    createNewEmployee(data) {
        return knex('employee').insert(data);
    }
    updateEmployee(data) {
        return knex('employee').update(data);
    }
    deleteEmployee(data) {
        return knex('employee').update({ status: 0 }).where('id', data.id);
    }

}