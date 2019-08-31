const repository = require('../repository/cidade.repository');
const estado = [];

module.exports = {

    find: (req, res) => {

        repository.find().then(result => {

            const cidades = [];
            //converte de RELACIONAL para OBJETO
            for (item of result) {

                let cidade = {
                    id: item.cidade_id,
                    nome: item.cidade_nome,
                    estado: {
                        id: item.estado_id,
                        nome: item.estado_nome,
                        sigra: item.estado_sigla
                    }

                }
                cidades.push(cidade);
            }
            console.log(result);
            res.send(cidades);
        }).catch(error => {
            res.status(500).send(error);
        });
    },

    findByID: (req, res) => {

        repository.findById(req.params).then(result => {
            if (!result[0]) {
                res.status(404).send('not found');
            } else {
                res.send(result[0]);
            }
        }).catch(error => {
            res.status(500).send(error);
        });
    },

    create: (req, res) => {
        //Converter de OBJETO para RELACIONAL
        const cidade = {
            nome: req.body.nome,
            estado_id: req.body.estado.id
        }
        repository.create(cidade).then(result => {
            console.log(cidade);
      //      req.body.id = result[0];
            res.send(cidade);
        }).catch(error => {
            res.status(500).send(error)
        });

    },

    update: (req, res) => {
        //Atualiza o id do objeto do req.body

        repository.update(req.body).then(result => {
            if (result.affectedRows == 0) {
                res.status(404).send('not found');
            } else {
                res.send(result[0]);
            }

        }).catch(error => {
            res.status(500).send(error)
        });

    },
    delete: (req, res) => {
        repository.delete().then(result => {
            res.status(204).send();
        }).catch(error => {
            res.status(500).send(error);
        });
    }
}