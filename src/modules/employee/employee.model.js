let response = require('../../responses');
let knex = require('../../../config/knex');
let config = require('../../../config/config');

module.exports = class departmentModel {
    constructor() { }

    getAllEmployee(data) {
        let cols = {
            emp_id: 'employee.id',
            emp_name: 'emp_name',
            phone: 'phone',
            email: 'email',
            deptId: 'deptId',
            gender: 'gender',
            role: 'role',
            password: 'password',
            deptName: 'department.deptName'
        }
        let obj = knex.select(cols).from('employee').leftJoin('department', 'department.id', '=', 'employee.deptId').where('employee.status',1);;
        if (data.id) obj.where('emp_id', data.id)
        return obj;
    }
    createNewEmployee(data) {
        return knex('employee').insert(data);
    }
    updateEmployee(data) {
        let emp_id = data.emp_id;
        delete data['emp_id'];
        return knex('employee').update(data).where('id',emp_id);
    }
    deleteEmployee(data) {
        return knex('employee').update({ status: 0 }).where('id', data.id);
    }

    isDuplicateEmployee(data){
        return knex.select('id').from('employee').where('email',data.email)
    }

}