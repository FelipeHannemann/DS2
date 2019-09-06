const connection = require('../mysql-connection');

const query = 'SELECT P.ID AS ID_PED, P.CODIGO AS CODIGO_PED, P.DTPEDIDO AS DATA_PED, ' +
              'P.OBSERVACAO AS OBSERVACAO_PED, C.ID AS ID_CLIENTE, C.CODIGO AS CODIGO_CLI, ' +
              'C.NOME AS NOME_CLI, C.EMAIL AS EMAIL_CLI, V.ID AS ID_VENDEDOR, V.CODIGO AS CODIGO_VENDEDOR, '+
              'V.NOME AS NOME_VENDEDOR, C.EMAIL AS EMAIL_VENDEDOR, PROD.ID AS ID_PROD,' +
              'PROD.CODIGO AS CODIGO_PROD, PROD.NOME AS PROD_NOME, PROD.DESCRICAO AS PROD_DESCRICAO, '+
              'PROD.PRECO AS PROD_PRECO, '+
              'PEDITEM.ID AS ID_PEDITEM, PEDITEM.QUANTIDADE AS QTA_ITEM, PEDITEM.VLRUNIT AS VLRUNIT_PEDITEM '+
              'FROM PEDIDO P '+ 
              'JOIN CLIENTE C ON P.CLIENTE_ID = C.ID '+
              'JOIN VENDEDOR V ON P.VENDEDOR_ID = V.ID '+
              'JOIN PRODUTO PROD ON P.ID = PROD.ID ' +
              'JOIN ITEMPEDIDO PEDITEM ON PEDITEM.PEDIDO_ID = P.ID';

module.exports = {

    find: (callback) => {
        connection.query(query, callback);
},

    findById: (params, callback) => {        
        connection.query('SELECT * FROM pedido WHERE ID = ?', [params.id], callback);
},

    create: (params, callback) => {
            connection.query('INSERT INTO pedido (CODIGO,DTPEDIDO,OBSERVACAO, VENDEDOR_ID, CLIENTE_ID) VALUES(?,?,?,?,?)',
            [params.codigo, params.dtPedido, params.observacao, params.vendedor_id, params.cliente_id], callback);           
        
    },

    update: (params, callback) => {
        connection.query('UPDATE pedido SET CODIGO = ?, DTPEDIDO = ?, OBSERVACAO = ?, VENDEDOR_ID = ?, CLIENTE_ID = ? WHERE id = ?',
        [params.codigo, params.dtPedido, params.observacao, params.vendedor_id, params.cliente_id, params.id], callback);           
    
},
    delete: (params, callback) => {        
        connection.query('DELETE  FROM pedido WHERE ID = ?', [params.id], callback);
}
};