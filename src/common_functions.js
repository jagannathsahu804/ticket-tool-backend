let moment = require('moment');
module.exports = class departmentService {

    addDays(noOfDays) {
        let today = moment();
        return moment(today).add(noOfDays, 'days').format('YYYY-MM-DD');
    }

}