const repository = require('../repository/person.repository');
const persons = [];

module.exports = {

    find: (req,res) => {

        repository.find((error, result) => {
            if (error) {
                res.status(500).send(error);
            }

            res.send(result);
        });
        
    },

    findByID: (req,res) => {
       
        repository.findById(req.params, (error, result) => {
            if (error) {
                res.status(500).send(error);
            }

            res.send(result[0]);
        });

    },

    create: (req,res) => {

        repository.create(req.body, (error, result) => {
            if (error) {
                res.status(500).send(error);
            }

            res.send(result);
        });

    },

    update: (req,res) => {
        const {id} = req.params;
        const person = req.body;

        persons[id-1] = person;

//        persons.push(); Não precisa.

        res.send(person);
    },

    delete: (req,res) => {
        const {id} = req.params;

        persons.splice(id-1, 1)

        res.send(204).send();      
    }

}