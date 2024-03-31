let Validator = require('validatorjs');
let service = new (require('./ticket.service'))();
let response = require('../../responses');
let config = require('../../../config/config')
// let model = new (require('./ticket.model'))();

module.exports = class ticketController {
    constructor() { }

    async check_login(req, res) {
        let returnResponse = {};
        console.log("afasd",config.host,config.username)
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
}