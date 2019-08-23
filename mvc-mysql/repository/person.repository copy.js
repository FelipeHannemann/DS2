const connection = require('../mysql-connection');

module.exports = {

    find: (callback) => {
        connection.query('SELECT * FROM estado', callback);
},

    findById: (params, callback) => {        
        connection.query('SELECT * FROM estado WHERE ID = ?', [params.id], callback);
},

    create: (params, callback) => {
            connection.query('INSERT INTO person (name,gender,age) VALUES(?,?,?)', [params.name,
            params.gender, params.age], callback);           
        
    },

    update: (params, callback) => {
        connection.query('UPDATE estado SET name = ?, gender = ?, age = ? WHERE id = ?', [params.name,
        params.gender, params.age, params.id], callback);           
    
},
    delete: (params, callback) => {        
        connection.query('DELETE  FROM estado WHERE ID = ?', [params.id], callback);
}
};