const connection = require('../mysql-connection');

module.exports = {
    find: (callback) => {
        connection.query('', callback);
    },
    findById: (params, callback) => {
        connection.query('', callback);
    },
    create: (params, callback) => {
        connection.query('', callback);
    },
    update: (params, callback) => {
        connection.query('', callback);
    },
    delete: (params, callback) => {
        connection.query('', callback);
    }
}