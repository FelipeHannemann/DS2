import { PsicologoEntity } from './../entity/psicologo.entity';
import { Request, Response } from 'express';
import {getRepository} from 'typeorm'

class PsicologoController {

    public async find(req: Request, res: Response) {

        try {
            const psicologos = await getRepository(PsicologoEntity).find();
            
            res.send(psicologos);
        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async create(req: Request, res: Response) {
        const psicologo = req.body;

        try {
            await getRepository(PsicologoEntity).save(psicologo);
            res.send(psicologo);

        } catch(error) {
            res.status(500).send(error);
        }
    }

    public async findById(req: Request, res: Response) {
        const id = req.params.id;

        try {
            //Busca registro pelo ID
            const psicologo = await getRepository(PsicologoEntity).findOne(id);

            //Se não encontrar, devolve erro 404
            if (!psicologo) {
                res.status(404).send('Not found');
                return;    
            }
            
            res.send(psicologo);
        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async update(req: Request, res: Response) {
        const id = req.params.id;
        const novo = req.body;

        try {
            //Busca registro pelo ID
            const psicologo = await getRepository(PsicologoEntity).findOne(id);

            //Se não encontrar, devolve erro 404
            if (!psicologo) {
                res.status(404).send('Not found');
                return;    
            }

            await getRepository(PsicologoEntity).update(psicologo.id, novo);
            
            //Atualiza ID do novo
            novo.id = psicologo.id;

            res.send(novo);
        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async delete(req: Request, res: Response) {
        const id = req.params.id;

        try {
            //Busca registro pelo ID
            const psicologo = await getRepository(PsicologoEntity).findOne(id);

            //Se não encontrar, devolve erro 404
            if (!psicologo) {
                res.status(404).send('Not found');
                return;    
            }

            await getRepository(PsicologoEntity).delete(psicologo);
            
            res.status(204).send();
        } catch (error) {
            res.status(500).send(error);
        }

    }
}

export default new PsicologoController();