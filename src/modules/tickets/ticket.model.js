let response = require('../../responses');
let knex = require('../../../config/knex');
let config = require('../../../config/config');

module.exports = class ticketModel {
    constructor() {}

    getUserData(data){
        let cols = {
            emp_id: 'emp_id',
            emp_name: 'emp_name',
            phone: 'phone',
            email: 'email',
            deptId: 'deptId',
            gender: 'gender',
            role: 'role',
            password: 'password'
        }
        return knex.select(cols).from('employee').where('email',data.email).andWhere('password',data.password)
    }

}