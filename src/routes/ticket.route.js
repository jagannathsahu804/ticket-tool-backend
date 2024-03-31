let router = require('express').Router();
let ticketController = new (require('../modules/tickets/ticket.controller'))();

router.post("/login",ticketController.check_login);

module.exports = router;