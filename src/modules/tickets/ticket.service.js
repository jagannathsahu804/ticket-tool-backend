let response = require('../../responses');
let model = new (require('./ticket.model'))();
const crypto = require('crypto');

module.exports = class ticketService {
    constructor() { }

    async check_login(formData) {
        let resp = await model.getUserData(formData);
        return !resp.length ? response.failed('user_not_found') : response.success('login_success', resp[0]);
    }

    async register(formData) {
        let resp = await model.getUserData(formData);
        if (resp.length > 0) {
            return response.failed('already_registered')
        }
        return response.success('register_success', {});
    }

    async CreateNewTicket(formData) {
        formData['ticketNo'] = await this.checkAndGenerateUnique();
        let resp = await model.CreateNewTicket(formData);
        if (!resp.length && resp.length == 0) return response.failed('failed_to_save')
        return response.success('save_success', {});
    }

    async getTicketsCreatedByEmpId(formData) {
        let resp = await model.getTicketsCreatedByEmpId(formData);
        if (!resp) {
            return response.failed('No_record_found')
        }
        return response.success('record_found', resp);
    }

    // Function to get today's date in 'YYYYMMDD' format
    generateUniqueNumberWithDate() {
        let uniqueId = crypto.randomBytes(4).toString('hex'); // Generates a random 8-character hex string
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(today.getDate()).padStart(2, '0');
        let formattedDate = `${year}${month}${day}`;
        return `${uniqueId}-${formattedDate}`;
    }

    async checkAndGenerateUnique() {
        let unique = this.generateUniqueNumberWithDate();
        let data = await model.getAllTickets();
        let all_data = data.map(item => item.ticketNo);
        if (all_data.includes(unique)) this.checkAndGenerateUnique();
        else return unique;
    }

}