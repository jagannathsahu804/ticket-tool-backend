let config = require('./config.js')

module.exports = require('knex')({
    client: 'mysql',
    connection:{
        host: config.host,
        user: config.username,
        password: config.password,
        database: config.db_name,
        timezone: 'IST'
    },
    useNullAsDefault: true,
    acquireConnectionTimeout: 300000
})