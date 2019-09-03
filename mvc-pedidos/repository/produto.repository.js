const connection = require('../mysql-connection');

module.exports = {

    find: (callback) => {
        connection.query('SELECT * FROM produto', callback);
},

    findById: (params, callback) => {        
        connection.query('SELECT * FROM produto WHERE ID = ?', [params.id], callback);
},

    create: (params, callback) => {
            connection.query('INSERT INTO produto (codigo,nome,descricao) VALUES(?,?,?)', [params.codigo,
            params.nome, params.descricao], callback);           
        
    },

    update: (params, callback) => {
        connection.query('UPDATE produto SET codigo = ?, nome = ?, descricao = ? WHERE id = ?', [params.codigo,
        params.nome, params.descricao, params.id], callback);           
    
},
    delete: (params, callback) => {        
        connection.query('DELETE  FROM produto WHERE ID = ?', [params.id], callback);
}
};