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

    async createNewEmployee(req, res) {
        let returnResponse = {};
        let formData = {
            deptId: req.body.deptId,
            deptName: req.body.deptName,
            deptHeadName: req.body.deptHeadName,
            deptHeadEmpId: req.body.deptHeadEmpId
        }
        let rules = {
            deptId: 'required',
            deptName: 'required',
            deptHeadName: 'required',
            deptHeadEmpId: 'required'
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
            email: req.body.email,
            password: req.body.password
        }
        let rules = {
            email: "required",
            password: "required"
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
            email: req.body.email,
            password: req.body.password
        }
        let rules = {
            email: "required",
            password: "required"
        }
        let validation = new Validator(formData, rules)
        if (validation.passes() || !validation.fails()) {
            returnResponse = await service.deleteEmployee(formData)
        } else returnResponse = response.failed('required', validation.errors.errors)
        console.log(returnResponse)
        res.json(returnResponse);
    }
}