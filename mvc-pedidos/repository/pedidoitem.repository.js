const connection = require('../mysql-connection');

const query = 'SELECT PEDITEM.ID AS ID_PEDITEM, PEDITEM.QUANTIDADE AS QTA_ITEM, PEDITEM.VLRUNIT AS VLRUNIT_PEDITEM, ' +
    'PROD.ID AS ID_PROD, PROD.CODIGO AS CODIGO_PROD, PROD.NOME AS PROD_NOME, PROD.DESCRICAO AS PROD_DESCRICAO, PROD.PRECO AS PROD_PRECO, '+
    'P.ID AS ID_PED, P.CODIGO AS CODIGO_PED, P.DTPEDIDO AS DATA_PED, P.OBSERVACAO AS OBSERVACAO_PED '+
    'FROM ITEMPEDIDO PEDITEM '+
    'JOIN PRODUTO PROD ON PEDITEM.PRODUTO_ID = PROD.ID '+
    'JOIN PEDIDO P ON PEDITEM.PEDIDO_ID = P.ID'

module.exports = {

    find: (callback) => {
        connection.query(query, callback);
},

    findById: (params, callback) => {        
        connection.query(query+ ' WHERE PEDITEM.ID = ?', [params.id], callback);
},

    create: (params, callback) => {
            connection.query('INSERT INTO ITEMPEDIDO (QUANTIDADE,VLRUNIT,PRODUTO_ID, PEDIDO_ID) VALUES(?,?,?,?)',
            [params.quantidade, params.vlrunit, params.produto_id, params.pedido_id], callback);           
        
    },

    update: (params, callback) => {
        connection.query('UPDATE ITEMPEDIDO SET QUANTIDADE = ?, VLRUNIT = ?, PRODUTO_ID = ?, PEDIDO_ID = ? WHERE ID = ?',
        [params.quantidade, params.vlrunit, params.produto_id, params.pedido_id, params.id], callback);              
    
},
    delete: (params, callback) => {        
        connection.query('DELETE  FROM ITEMPEDIDO WHERE ID = ?', [params.id], callback);
}
};