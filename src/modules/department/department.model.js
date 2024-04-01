let response = require('../../responses');
let knex = require('../../../config/knex');
let config = require('../../../config/config');

module.exports = class departmentModel {
    constructor() { }

    getAllDept(data) {
        let cols = {
            deptId: 'id',
            deptName: 'deptName',
            deptHeadName: 'deptHeadName',
            deptHeadEmpId: 'deptHeadEmpId'
        }
        return knex.select(cols).from('department');
    }
    createNewDept(data) {
        return knex('department').insert(data);
    }
    updateDept(data) {
        return knex('department').update(data);
    }
    deleteDept(data) {
        return knex('department').update({ status: 0 }).where('id', data.id);
    }

}