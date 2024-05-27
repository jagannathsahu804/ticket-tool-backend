let router = require('express').Router();
let ticketController = new (require('../modules/tickets/ticket.controller'))();
let departmentController = new (require('../modules/department/department.controller'))();
let employeeController = new (require('../modules/employee/employee.controller'))();

router.post("/login",ticketController.check_login);
router.post("/register",ticketController.register);

//department
router.get("/GetDepartments",departmentController.getAllDept);
router.post("/CreateDepartment",departmentController.createNewDept);
router.put("/UpdateDepartment",departmentController.updateDept);
router.delete("/DeleteDepartment",departmentController.deleteDept);

//employees
router.get("/GetEmployees",employeeController.getAllEmployee);
router.post("/CreateEmployee",employeeController.createNewEmployee);
router.put("/UpdateEmployee",employeeController.updateEmployee);
router.delete("/DeleteEmployee",employeeController.deleteEmployee);

//New Ticket
router.post("/CreateNewTicket",ticketController.CreateNewTicket);
router.get("/getTicketsCreatedByEmpId",ticketController.getTicketsCreatedByEmpId);


module.exports = router;