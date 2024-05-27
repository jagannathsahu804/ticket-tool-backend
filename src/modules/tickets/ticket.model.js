let response = require('../../responses');
let knex = require('../../../config/knex');
let config = require('../../../config/config');

module.exports = class ticketModel {
    constructor() { }

    getUserData(data) {
        let cols = {
            emp_id: 'id',
            emp_name: 'emp_name',
            phone: 'phone',
            email: 'email',
            deptId: 'deptId',
            gender: 'gender',
            role: 'role',
            password: 'password'
        }
        return knex.select(cols).from('employee').where('email', data.email).andWhere('password', data.password)
    }

    getAllTickets() {
        return knex.select('*').from('ticketdetails');
    }

    getTicketsCreatedByEmpId(data) {
        let cols = {
            ticketId: 'ticketdetails.id',
            employeeId: 'employeeId',
            assignedTo: 'assignedTo',
            deptName: 'department.deptName',
            ticketNo: 'ticketNo',
            severity: 'severity',
            state: 'state',
            requestDetails: 'requestDetails',
            expectedEndDate: 'expectedEndDate',
            completedDate: 'completedDate',
            createdDate: 'ticketdetails.created_at',
        }
        return knex.select(cols).from('ticketdetails')
            .leftJoin('department', 'department.id', 'ticketdetails.deptId')
            .where('employeeId', data.id);
    }

    CreateNewTicket(data) {
        return knex('ticketdetails').insert(data);
    }

}