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

    getEmployeeDetails(data) {
        let cols = {
            totalEmployees: knex.raw(
                `SUM(CASE WHEN role = 'Employee' THEN 1 ELSE 0 END)`
            ),
            totalDepartmentHeads: knex.raw(
                `SUM(CASE WHEN role = 'Department Head' THEN 1 ELSE 0 END)`
            ),
            totalAdminDepartmentEmployees: knex.raw(
                `SUM(CASE WHEN role = 'Admin Department Employee' THEN 1 ELSE 0 END)`
            ),
        };
    
        return knex
            .select(cols)
            .from('employee')
            .where('status', 1);
    }
    

    getTicketDetails(data) {
        let cols = {
            totalOpenTickets: knex.raw(
                `SUM(CASE WHEN state = 'Un-Assigned' THEN 1 ELSE 0 END)`
            ),
            totalAssignedTickets: knex.raw(
                `SUM(CASE WHEN state = 'Assigned' THEN 1 ELSE 0 END)`
            ),
            totalClosedTickets: knex.raw(
                `SUM(CASE WHEN state = 'Closed' THEN 1 ELSE 0 END)`
            ),
            totalTicketsInProgress: knex.raw(
                `SUM(CASE WHEN state = 'In-Progress' THEN 1 ELSE 0 END)`
            ),
        };
    
        return knex
            .select(cols)
            .from('ticketdetails')
    }
    
    getDeptDetails(data){
        let cols = {
            totalDepartments: knex.raw('count(id)')
        }
        return knex.select(cols).from('department').where('status',1);
    }

}