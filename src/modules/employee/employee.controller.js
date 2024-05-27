let Validator = require('validatorjs');
let service = new (require('./employee.service'))();
let response = require('../../responses');
let config = require('../../../config/config')

module.exports = class ticketController {
    constructor() { }

    async getAllEmployee(req, res) {
        let returnResponse = {};
        let formData = {}
        let rules = {}
        let validation = new Validator(formData, rules)
        if (validation.passes() || !validation.fails()) {
            returnResponse = await service.getAllEmployee(formData)
        } else returnResponse = response.failed('required', validation.errors.errors)
        res.json(returnResponse);
    }

    async getEmployeeById(req, res) {
        let returnResponse = {};
        let formData = {
            id: req.query.id,
        }
        let rules = {
            id: "required",
        }
        let validation = new Validator(formData, rules)
        if (validation.passes() || !validation.fails()) {
            returnResponse = await service.getAllEmployee(formData)
        } else returnResponse = response.failed('required', validation.errors.errors)
        res.json(returnResponse); 
    }

    async createNewEmployee(req, res) {
        let returnResponse = {};
        let formData = {
            deptId: req.body.deptId,
            email: req.body.email,
            emp_name: req.body.emp_name,
            gender: req.body.gender,
            password: req.body.password,
            phone: req.body.phone,
            role: req.body.role,
        }

        let rules = {
            deptId: 'required',
            email: 'required',
            emp_name: 'required',
            gender: 'required',
            password: 'required',
            phone: 'required',
            role: 'required',
        }
        let validation = new Validator(formData, rules)
        if (validation.passes() || !validation.fails()) {
            returnResponse = await service.createNewEmployee(formData)
        } else returnResponse = response.failed('required', validation.errors.errors)
        console.log(returnResponse)
        res.json(returnResponse);
    }

    async updateEmployee(req, res) {
        let returnResponse = {};
        let formData = {
            emp_id: req.body.emp_id,
            deptId: req.body.deptId,
            email: req.body.email,
            emp_name: req.body.emp_name,
            gender: req.body.gender,
            password: req.body.password,
            phone: req.body.phone,
            role: req.body.role,
        }

        let rules = {
            emp_id: 'required',
            deptId: 'required',
            email: 'required',
            emp_name: 'required',
            gender: 'required',
            password: 'required',
            phone: 'required',
            role: 'required',
        }
       let validation = new Validator(formData, rules)
        if (validation.passes() || !validation.fails()) {
            returnResponse = await service.updateEmployee(formData)
        } else returnResponse = response.failed('required', validation.errors.errors)
        console.log(returnResponse)
        res.json(returnResponse);
    }

    async deleteEmployee(req, res) {
        let returnResponse = {};
        let formData = {
            id: req.query.id,
        }
        let rules = {
            id: "required",
        }
        let validation = new Validator(formData, rules)
        if (validation.passes() || !validation.fails()) {
            returnResponse = await service.deleteEmployee(formData)
        } else returnResponse = response.failed('required', validation.errors.errors)
        console.log(returnResponse)
        res.json(returnResponse);
    }
}