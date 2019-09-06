const repository = require('../repository/pedidoitem.repository');

module.exports = {

    find: (req, res) => {

        repository.find((error, result) => {
            if (error) {
                res.status(500).send(error);
            }

            const pedidos = [];
            //converte de RELACIONAL para OBJETO
            for (ped of result) {

                let pedido = {
                    id: ped.ID_PEDITEM,
                    quantidade: ped.QTA_ITEM,
                    vlrunit: ped.VLRUNIT_PEDITEM,
                    produto: {
                        id: ped.ID_PROD,
                        codigo: ped.CODIGO_PROD,
                        nome: ped.PROD_NOME,
                        descricao: ped.PROD_DESCRICAO,
                        preco: ped.PROD_PRECO
                    },
                    codpedido:ped.ID_PED

                }
                pedidos.push(pedido);

            }

            res.send(pedidos);
        });

    },

    findByID: (req, res) => {

        repository.findById(req.params, (error, result) => {
            if (error) {
                res.status(500).send(error);
            }

            if (!result[0]) {
                res.status(404).send('not found');
            } else {
                
                res.send(result[0]);
            }


        });

    },

    create: (req, res) => {
        repository.create(req.body, (error, result) => {
            if (error) {
                res.status(500).send(error);
            }

            res.send(result);

        });

    },

    update: (req, res) => {
        //Atualiza o id do objeto do req.body
        req.body.id = req.params.id;
        repository.update(req.body, (error, result) => {
            if (error) {
                res.status(500).send(error);
            }
            console.log(req.body);
            if (result.affectedRows == 0) {
                res.status(404).send('not found');
            } else {
                res.send(result);
            }

        });

    },
    delete: (req, res) => {

        repository.delete(req.params, (error, result) => {
            if (error) {
                res.status(500).send(error);
            }

            res.status(204).send();
        });

    }
}