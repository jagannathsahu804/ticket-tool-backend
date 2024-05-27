let Validator = require('validatorjs');
let service = new (require('./ticket.service'))();
let response = require('../../responses');
let config = require('../../../config/config')
let common_function = new (require('../../common_functions'))();
// let model = new (require('./ticket.model'))();


module.exports = class ticketController {
    constructor() { }

    async check_login(req, res) {
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
            returnResponse = await service.check_login(formData)
        } else returnResponse = response.failed('required', validation.errors.errors)
        console.log(returnResponse)
        res.json(returnResponse);
    }

    async register(req, res) {
        let returnResponse = {};
        let formData = {
            emp_id: req.body.emp_id,
            emp_name: req.body.emp_name,
            phone: req.body.phone,
            email: req.body.email,
            deptId: req.body.deptId,
            gender: req.body.gender,
            role: req.body.role,
            password: req.body
        }
        let rules = {
            emp_id: 'required',
            emp_name: 'required',
            phone: 'required',
            email: 'required',
            deptId: 'required',
            gender: 'required',
            role: 'required',
            password: 'required'
        }
        let validation = new Validator(formData, rules)
        if (validation.passes() || !validation.fails()) {
            // returnResponse = await service.register(formData)
        } else returnResponse = response.failed('required', validation.errors.errors)
        console.log(returnResponse)
        res.json(returnResponse);
    }

    async CreateNewTicket(req, res) {
        let returnResponse = {};
        let formData = {
            deptId: req.body.deptId,
            severity: req.body.severity,
            employeeId: req.body.employeeId,
            state: "Un-Assigned",
            expectedEndDate: common_function.addDays(7),
            requestDetails: req.body.requestDetails,
        }

        let rules = {
            deptId: 'required',
            severity: 'required',
            employeeId: 'required',
            requestDetails: 'required',
        }
        let validation = new Validator(formData, rules)
        if (validation.passes() || !validation.fails()) {
            returnResponse = await service.CreateNewTicket(formData)
        } else returnResponse = response.failed('required', validation.errors.errors)
        console.log(returnResponse)
        res.json(returnResponse);
    }

    async getTicketsCreatedByEmpId(req,res){
        let returnResponse = {};
        let formData = {
            id: req.query.id,
        }
        let rules = {
            id: "required",
        }
        let validation = new Validator(formData, rules)
        if (validation.passes() || !validation.fails()) {
            returnResponse = await service.getTicketsCreatedByEmpId(formData)
        } else returnResponse = response.failed('required', validation.errors.errors)
        console.log(returnResponse)
        res.json(returnResponse);
    }
}