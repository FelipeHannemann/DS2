const connection = require('../mysql-connection');

module.exports = {

    find: (callback) => {
        connection.query('SELECT * FROM cidade', callback);
},

    findById: (params, callback) => {        
        connection.query('SELECT * FROM cidade WHERE ID = ?', [params.id], callback);
},

    create: (params, callback) => {
            connection.query('INSERT INTO cidade (nome,estado_id) VALUES(?,?)', [params.nome,
            params.estado_id], callback);           
        
    },

    update: (params, callback) => {
        connection.query('UPDATE cidade SET nome = ?, estado_id = ? WHERE id = ?', [params.nome,
        params.estado_id, params.id], callback);           
    
},
    delete: (params, callback) => {        
        connection.query('DELETE FROM cidade WHERE ID = ?', [params.id], callback);
}
};