const repository = require('../repository/pedido.repository');

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
                    id: ped.ID_PED,
                    codigo: ped.CODIGO_PED,
                    dtpedido: ped.DATA_PED,
                    observacao: ped.OBSERVACAO_PED,
                    cliente: {
                        id: ped.ID_CLIENTE,
                        codigo: ped.CODIGO_CLI,
                        nome: ped.NOME_CLI,
                        email: ped.EMAIL_CLI
                    },
                    vendedor: {
                        id: ped.ID_VENDEDOR,
                        codigo: ped.CODIGO_VENDEDOR,
                        nome: ped.NOME_VENDEDOR,
                        email: ped.EMAIL_VENDEDOR
                    },
                    itens: ped.itens

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