require('dotenv').config();
const express = require('express');
const app = express();
let api_validator = require('./src/api_validator')
let cors = require('cors')
let indexRouter = require('./src/index');
let port = process.env.PORT || '3000';

app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json({limit: '50mb'}));
// app.use(api_validator);
app.use('/api/',indexRouter)

// Start the server
app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
