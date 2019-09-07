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

            if (error) {
                callback(error, false);
                return;
            }

            const idPedido = resultPedido[0].ID_PED;

            const queryItens = 'SELECT ip.id as ip_id, ip.quantidade, ip.vlrunit, ' +
                'p.id as p_id, p.codigo, p.nome, p.descricao, p.preco ' +
                'FROM itempedido ip ' +
                'INNER JOIN produto p ON p.id = ip.produto_id ' +
                'WHERE ip.pedido_id = ' + idPedido;

            connection.query(queryItens, (error, resultItens) => {
                if (error) {
                    callback(error, false);
                    return;
                }

                const itens = [];

                for (item of resultItens) {

                    let itempedido = {
                        id: item.ip_id,
                        qtdade: item.qtdade,
                        vlrunit: item.vlrunit,
                        produto: {
                            id: item.p_id,
                            codigo: item.codigo,
                            nome: item.nome,
                            descricao: item.descricao,
                            preco: item.preco
                        }
                    }

                    itens.push(itempedido);

                }

                resultPedido[0].itens = itens;

                callback(error, resultPedido);
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