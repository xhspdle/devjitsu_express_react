const mysql = require('mysql');
const dbconfig = require('../config/db-config.json');

let conn;

const dbConn = () => {
    conn = mysql.createConnection(dbconfig);

    conn.connect((error) => {
        if (error) {
            console.log(`>>> connecting error: ${error}`);
            setTimeout(dbConn, 2000);
        }
    });

    conn.on('error', (error) => {
        if(error.code === 'PROTOCOL_CONNECTION_LOST') {
            return dbConn();
        }
        throw error;
    });

    return conn;
}

module.exports = dbConn();