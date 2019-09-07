const connection = require('../mysql-connection');

const query = 'SELECT P.ID AS ID_PED, P.CODIGO AS CODIGO_PED, P.DTPEDIDO AS DATA_PED, ' +
    'P.OBSERVACAO AS OBSERVACAO_PED, C.ID AS ID_CLIENTE, C.CODIGO AS CODIGO_CLI, ' +
    'C.NOME AS NOME_CLI, C.EMAIL AS EMAIL_CLI, V.ID AS ID_VENDEDOR, V.CODIGO AS CODIGO_VENDEDOR, ' +
    'V.NOME AS NOME_VENDEDOR, C.EMAIL AS EMAIL_VENDEDOR ' +
    'FROM PEDIDO P ' +
    'JOIN CLIENTE C ON P.CLIENTE_ID = C.ID ' +
    'JOIN VENDEDOR V ON P.VENDEDOR_ID = V.ID ';

module.exports = {

    find: (callback) => {
        connection.query(query, (error, resultPedido) => {
            const idPedido = resultPedido[0].ID_PED;
            const queryitens = 'Select ip.id as ip_id, ip.quantidade,  ip.VLRUNIT, ' +
                'P.ID AS p_id, P.CODIGO, P.NOME, P.DESCRICAO, P.PRECO ' +
                'from itempedido ip ' +
                'INNER JOIN PRODUTO P ON P.ID = IP.PRODUTO_ID ' +
                'WHERE IP.PEDIDO_ID = ? ' + idPedido;

            connection.query(queryitens, (error, resultItens) => {

                const itens = [];

                for (item of resultItens) {
                    let itempedido = {
                        id: item.ip_id,
                        qtdade: item.quantidade,
                        vlrunit: item.VLRUNIT,
                        produto:{
                            id: item.p_id,
                            codigo: item.CODIGO,
                            nome:item.NOME,
                            descricao: item.DESCRICAO,
                            preco: item.PRECO
                        }
                    }
                    itens.push(itempedido);
                }

                resultPedido[0].itens = itens;
                callback(error, resultPedido)
            });

        });
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