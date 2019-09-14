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

        const idPedido = params.id;
        connection.query(query + ' WHERE P.ID =' + idPedido, (error, resultPedido) => {

            if (error) {
                callback(error, false);
                return;
            }
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

    create: (params) => {
        connection.beginTransaction(error => {
            if (error) {
                callback(error, false);
                return
            };
            //Insere o cabeçalho do pedido   
            connection.query('INSERT INTO pedido (CODIGO,DTPEDIDO,OBSERVACAO, VENDEDOR_ID, CLIENTE_ID) VALUES(?,?,?,?,?)',
                [params.codigo, params.dtPedido, params.observacao, params.vendedor_id, params.cliente_id], (error, cabecResult) => {
                    // Faz roolback, se error no cabecalho
                    if (error) {
                        connection.rollback(() =>{
                            callback(error, false);
                            return;
                        })
                    };

                    const pedidoId = cabecResult.id;
                    //Monta query de insercao de itens
                    let queryAux = '';
                    let qrInsertItens = 'INSERT INTO ITEMPEDIDO (QUANTIDADE,VLRUNIT,PRODUTO_ID, PEDIDO_ID) VALUES';
                    //Insere os Itens do Pedido
                    for (item of params.itens) {
                        
                        queryAux += queryAux == '' ? '' : ',' +  "("+ pedidoId +","+ item.produto.id +", "+ item.qtdade + ", "+ item.vlrunit +
                        ")"
                        callback(false, queryAux);
                    }
                });
        });
    },

    update: (params, callback) => {
        connection.query('UPDATE pedido SET CODIGO = ?, DTPEDIDO = ?, OBSERVACAO = ?, VENDEDOR_ID = ?, CLIENTE_ID = ? WHERE id = ?',
            [params.codigo, params.dtPedido, params.observacao, params.vendedor_id, params.cliente_id, params.id], callback);

    },
    delete: (params, callback) => {
        connection.query('DELETE  FROM pedido WHERE ID = ?', [params.id], callback);
    }
};