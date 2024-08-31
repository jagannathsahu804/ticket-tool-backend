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

    getAllTickets(data) {
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
    }

    getAssignedTicketsByEmpId(data) {
        let cols = {
            ticketId: 'ticketdetails.id',
            employeeId: 'employeeId',
            assignee: 'employee.emp_name',
            assignedTo: 'assignedTo',
            contactNo: 'e.phone',
            createdBy: 'e.emp_name',
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
            .leftJoin('employee', 'employee.id', 'ticketdetails.assignedTo')
            .leftJoin('employee as e', 'e.id', 'ticketdetails.employeeId')
            .where('assignedTo', data.id);
    }

    GetEmpByDept(data) {
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
        let obj = knex.select(cols).from('employee').where('status', 1).where('role', 'Admin Department Employee');
        if (data.id) obj.where('deptId', data.id)
        return obj;
    }

    getDeptId(data) {
        return knex.select('*').from('department').where('deptHeadEmpId', data.id).where('status', 1);
    }

    getNewTickets(data) {
        console.log(data)
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
            assignee: 'employee.emp_name',
            createdBy: 'e.emp_name',
        }
        return knex.select(cols).from('ticketdetails')
            .leftJoin('department', 'department.id', 'ticketdetails.deptId')
            .leftJoin('employee', 'employee.id', 'ticketdetails.assignedTo')
            .leftJoin('employee as e', 'e.id', 'ticketdetails.employeeId')
            .whereIn('ticketdetails.deptId', data);
    }

    CreateNewTicket(data) {
        return knex('ticketdetails').insert(data);
    }

    assignTicket(data) {
        return knex('ticketdetails').update({ 'assignedTo': data.assignedTo, 'state': 'Assigned' }).where('id', data.ticketId);
    }

    startTicket(data) {
        return knex('ticketdetails').update({ 'state': 'In-Progress' }).where('id', data.ticketId);
    }

    closeTicket(data) {
        return knex('ticketdetails').update({ 'state': 'Closed', 'completedDate': knex.raw('now()')}).where('id', data.ticketId);
    }

}