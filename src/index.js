const express = require('express');
let router = express.Router();
let ticketRoutes = require('./routes/ticket.route');

router.use('/tickets/', ticketRoutes);

module.exports = router;
