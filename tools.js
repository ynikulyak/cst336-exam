const request = require('request');
const mysql = require('mysql');
const isLocal = true;

var user = isLocal ? 'root' : '';
var password = isLocal ? '' : '';
var host = isLocal ? 'localhost' : '';
var database = isLocal ? 'final' : '';

module.exports = {    
    /**
    * Create db connection
    */
    createConnection: () => {
        const conn = mysql.createConnection({
            host: host,
            user: user,
            password: password,
            database: database
        });

        return conn;
    }
}