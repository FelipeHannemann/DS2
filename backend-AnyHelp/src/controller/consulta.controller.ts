import { ConsultaEntity } from './../entity/consulta.entity';
import { Request, Response } from 'express';
import {getRepository} from 'typeorm'

class ConsultaController {

    public async find(req: Request, res: Response) {

        try {
            const consultas = await getRepository(ConsultaEntity).find();
            
            res.send(consultas);
        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async create(req: Request, res: Response) {
        const consulta = req.body;

        try {
            await getRepository(ConsultaEntity).save(consulta);
            res.send(consulta);

        } catch(error) {
            res.status(500).send(error);
        }
    }

    public async findById(req: Request, res: Response) {
        const id = req.params.id;

        try {
            //Busca registro pelo ID
            const consulta = await getRepository(ConsultaEntity).findOne(id);

            //Se não encontrar, devolve erro 404
            if (!consulta) {
                res.status(404).send('Not found');
                return;    
            }
            
            res.send(consulta);
        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async update(req: Request, res: Response) {
        const id = req.params.id;
        const novo = req.body;

        try {
            //Busca registro pelo ID
            const consulta = await getRepository(ConsultaEntity).findOne(id);

            //Se não encontrar, devolve erro 404
            if (!consulta) {
                res.status(404).send('Not found');
                return;    
            }

            await getRepository(ConsultaEntity).update(consulta.id, novo);
            
            //Atualiza ID do novo
            novo.id = consulta.id;

            res.send(novo);
        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async delete(req: Request, res: Response) {
        const id = req.params.id;

        try {
            //Busca registro pelo ID
            const consulta = await getRepository(ConsultaEntity).findOne(id);

            //Se não encontrar, devolve erro 404
            if (!consulta) {
                res.status(404).send('Not found');
                return;    
            }

            await getRepository(ConsultaEntity).delete(consulta);
            
            res.status(204).send();
        } catch (error) {
            res.status(500).send(error);
        }

    }
}

export default new ConsultaController();