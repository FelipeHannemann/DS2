const repository = require('../repository/cidade.repository');
const estado = [];

module.exports = {

    find: (req,res) => {

        repository.find((error, result) => {
            if (error) {
                res.status(500).send(error);
            }

            const cidades = [];
            //converte de RELACIONAL para OBJETO
            for (item of result) {

                let cidade = {
                    id: item.cidade_id,
                    nome: item.cidade_nome,
                    estado:{
                        id: item.estado_id,
                        nome: item.estado_nome,
                        sigra: item.estado_sigla
                    }
                }
                cidades.push(cidade);

            }

            res.send(cidades);
        });
        
    },

    findByID: (req,res) => {
       
        repository.findById(req.params, (error, result) => {
            if (error) {
                res.status(500).send(error);
            }

            if (! result[0]){
                res.status(404).send('not found');
            }else{
                res.send(result[0]);
            }

            
        });

    },

    create: (req,res) => {
        //Converter de OBJETO para RELACIONAl
        const cidade = {
            nome: req.body.nome,
            estado_id: req.body.estado.id
        }

        repository.create(cidade, (error, result) => {
            if (error) {
                res.status(500).send(error);
            }
            
            res.send(result);
        
        });

    },

    update: (req,res) => {
    //Atualiza o id do objeto do req.body
        req.body.id = req.params.id;
        repository.update(req.body, (error, result) => {
            if (error) {
                res.status(500).send(error);
            }
            console.log(req.body);
            if (result.affectedRows == 0){
                res.status(404).send('not found');
            }else{
                res.send(result);
            }

        });

    },
    delete: (req,res) => {

        repository.delete(req.params, (error, result) => {
            if (error) {
                res.status(500).send(error);
            }

            res.status(204).send();
        });

    }  
}