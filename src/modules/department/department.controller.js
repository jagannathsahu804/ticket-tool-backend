let Validator = require('validatorjs');
let service = new (require('./department.service'))();
let response = require('../../responses');
let config = require('../../../config/config')

module.exports = class ticketController {
    constructor() { }

    async getAllDept(req, res) {
        let returnResponse = {};
        let formData = {}
        let rules = {}
        let validation = new Validator(formData, rules)
        if (validation.passes() || !validation.fails()) {
            returnResponse = await service.getAllDept(formData)
        } else returnResponse = response.failed('required', validation.errors.errors)
        res.json(returnResponse);
    }

    async createNewDept(req, res) {
        let returnResponse = {};
        let formData = {
            // id: req.body.deptId,
            deptName: req.body.deptName,
            deptHeadName: req.body.deptHeadName,
            deptHeadEmpId: req.body.deptHeadEmpId
        }
        let rules = {
            // deptId: 'required',
            deptName: 'required',
            deptHeadName: 'required',
            deptHeadEmpId: 'required'
        }
        let validation = new Validator(formData, rules)
        if (validation.passes() || !validation.fails()) {
            returnResponse = await service.createNewDept(formData)
        } else returnResponse = response.failed('required', validation.errors.errors)
        console.log(returnResponse)
        res.json(returnResponse);
    }

    async updateDept(req, res) {
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
            returnResponse = await service.updateDept(formData)
        } else returnResponse = response.failed('required', validation.errors.errors)
        console.log(returnResponse)
        res.json(returnResponse);
    }

    async deleteDept(req, res) {
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
            returnResponse = await service.deleteDept(formData)
        } else returnResponse = response.failed('required', validation.errors.errors)
        console.log(returnResponse)
        res.json(returnResponse);
    }
}