let response = require('../../responses');
let model = new (require('./ticket.model'))();

module.exports = class ticketService {
    constructor() { }

    async check_login(formData) {
        let resp = await model.getUserData(formData);
        return !resp.length ? response.failed('user_not_found') : response.success('login_success', resp[0]);
    }

    async register(formData) {
        let resp = await model.getUserData(formData);
        if(resp.length > 0){
            return response.failed('already_registered')
        } 
        return response.success('register_success', {});
    }
}