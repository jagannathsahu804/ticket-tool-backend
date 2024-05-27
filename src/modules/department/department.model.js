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
        return knex.select(cols).from('department').where('status',1);
    }
    createNewDept(data) {
        return knex('department').insert(data);
    }
    async updateDept(data) {
        let deptId = data.deptId;
        delete data['deptId']
        return knex('department').update(data).where('id',deptId).catch(e => console.log('------',e));
    }
    deleteDept(data) {
        return knex('department').update({ status: 0 }).where('id', data.id);
    }
    isDuplicateDepartment(data){
        return knex.select('id').from('department').where('deptName',data.deptName)
    }

}