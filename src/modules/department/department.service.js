let response = require('../../responses');
let model = new (require('./department.model'))();

module.exports = class departmentService {

    async getAllDept(formData) {
        let resp = await model.getAllDept(formData);
        if (!resp.length) {
            return response.failed('No_record_found')
        }
        return response.success('record_found', resp);
    }

    async getDashboardDetails(formData) {
        let EmployeeDetails = await model.getEmployeeDetails(formData)
        let TicketDetails = await model.getTicketDetails(formData)
        let DeptDetails = await model.getDeptDetails(formData)
        let resp = [{...EmployeeDetails[0],...TicketDetails[0],...DeptDetails[0]}];

        if (!resp.length) {
            return response.failed('No_record_found')
        }
        return response.success('record_found', resp);
    }

    async createNewDept(formData) {
        let isDuplicate = await model.isDuplicateDepartment(formData)
        if (isDuplicate.length) return response.success('already_registered_department', {});
        let resp = await model.createNewDept(formData);
        if (!resp.length && resp.length == 0) return response.failed('failed_to_save')
        return response.success('save_success', {});
    }
    async updateDept(formData) {
        let resp = await model.updateDept(formData);
        if (!resp) {
            return response.failed('failed_to_update')
        }
        return response.success('update_success', {});
    }
    async deleteDept(formData) {
        let resp = await model.deleteDept(formData);
        if (!resp) {
            return response.failed('failed_to_delete')
        }
        return response.success('delete_success', {});
    }
}