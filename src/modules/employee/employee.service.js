let response = require('../../responses');
let model = new (require('./employee.model'))();

module.exports = class departmentService {

    async getAllEmployee(formData) {
        let resp = await model.getAllEmployee(formData);
        if (!resp.length) {
            return response.failed('No_record_found')
        }
        return response.success('record_found', resp);
    }
    async createNewEmployee(formData) {
        let isDuplicate = await model.isDuplicateEmployee(formData)
        if (isDuplicate.length) return response.success('already_registered_employee', {});
        let resp = await model.createNewEmployee(formData);
        if (!resp.length && resp.length == 0) return response.failed('failed_to_save')
        return response.success('save_success', {});
    }
    async updateEmployee(formData) {
        let resp = await model.updateEmployee(formData);
        if (!resp) {
            return response.failed('failed_to_update')
        }
        return response.success('update_success', {});
    }
    async deleteEmployee(formData) {
        let resp = await model.deleteEmployee(formData);
        if (!resp) {
            return response.failed('failed_to_delete')
        }
        return response.success('delete_success', {});
    }
}