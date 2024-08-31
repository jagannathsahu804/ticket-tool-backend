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

    async assignTicket(formData) {
        let resp = await model.assignTicket(formData);
        if (!resp.length && resp.length == 0) return response.failed('assign_failed')
        return response.success('assign_success', {});
    }

    async getTicketsCreatedByEmpId(formData) {
        let resp = await model.getTicketsCreatedByEmpId(formData);
        if (!resp) {
            return response.failed('No_record_found')
        }
        return response.success('record_found', resp);
    }
    
    async getAllTickets(formData) {
        let resp = await model.getAllTickets(formData);
        if (!resp) {
            return response.failed('No_record_found')
        }
        return response.success('record_found', resp);
    }
    
    async getAssignedTicketsByEmpId(formData) {
        let resp = await model.getAssignedTicketsByEmpId(formData);
        if (!resp) {
            return response.failed('No_record_found')
        }
        return response.success('record_found', resp);
    }

    async getNewTickets(formData) {
        let getDeptData = await model.getDeptId(formData);
        console.log("getDeptData",getDeptData)
        let getDeptIds = getDeptData.map(item => item.id);
        let resp = await model.getNewTickets(getDeptIds);
        if (!resp) {
            return response.failed('No_record_found')
        }
        return response.success('record_found', resp);
    }

    async GetEmpByDept(formData) {
        let resp = await model.GetEmpByDept(formData);
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
        return `REQ-${uniqueId}-${formattedDate}`;
    }

    async checkAndGenerateUnique() {
        let unique = this.generateUniqueNumberWithDate();
        let data = await model.getAllTickets();
        let all_data = data.map(item => item.ticketNo);
        if (all_data.includes(unique)) this.checkAndGenerateUnique();
        else return unique;
    }

    async startTicket(formData) {
        let resp = await model.startTicket(formData);
        if (!resp.length && resp.length == 0) return response.failed('assign_failed')
        return response.success('assign_success', {});
    }

    async closeTicket(formData) {
        let resp = await model.closeTicket(formData);
        if (!resp.length && resp.length == 0) return response.failed('assign_failed')
        return response.success('assign_success', {});
    }
}