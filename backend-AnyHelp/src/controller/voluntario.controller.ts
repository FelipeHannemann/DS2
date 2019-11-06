import { VoluntarioEntity } from '../entity/voluntario.entity';
import { Request, Response } from 'express';
import {getRepository} from 'typeorm'

class VoluntarioController {

    public async find(req: Request, res: Response) {

        try {
            const voluntarios = await getRepository(VoluntarioEntity).find();
            
            res.send(voluntarios);
        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async create(req: Request, res: Response) {
        const voluntario = req.body;

        try {
            await getRepository(VoluntarioEntity).save(voluntario);
            res.send(voluntario);

        } catch(error) {
            res.status(500).send(error);
        }
    }

    public async findById(req: Request, res: Response) {
        const id = req.params.id;

        try {
            //Busca registro pelo ID
            const voluntario = await getRepository(VoluntarioEntity).findOne(id);

            //Se não encontrar, devolve erro 404
            if (!voluntario) {
                res.status(404).send('Not found');
                return;    
            }
            
            res.send(voluntario);
        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async update(req: Request, res: Response) {
        const id = req.params.id;
        const novo = req.body;

        try {
            //Busca registro pelo ID
            const voluntario = await getRepository(VoluntarioEntity).findOne(id);

            //Se não encontrar, devolve erro 404
            if (!voluntario) {
                res.status(404).send('Not found');
                return;    
            }

            await getRepository(VoluntarioEntity).update(voluntario.id, novo);
            
            //Atualiza ID do novo
            novo.id = voluntario.id;

            res.send(novo);
        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async delete(req: Request, res: Response) {
        const id = req.params.id;

        try {
            //Busca registro pelo ID
            const voluntario = await getRepository(VoluntarioEntity).findOne(id);

            //Se não encontrar, devolve erro 404
            if (!voluntario) {
                res.status(404).send('Not found');
                return;    
            }

            await getRepository(VoluntarioEntity).delete(voluntario);
            
            res.status(204).send();
        } catch (error) {
            res.status(500).send(error);
        }

    }
}

export default new VoluntarioController();