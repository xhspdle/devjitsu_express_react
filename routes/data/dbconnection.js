const mysql = require('mysql2/promise');
const dbconfig = require('../config/db-config.json');

const pool = mysql.createPool(dbconfig);

module.exports = pool;