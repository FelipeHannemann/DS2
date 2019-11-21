import { PostitiEntity } from './../entity/postiti.entity';
import { Request, Response } from 'express';
import {getRepository} from 'typeorm'

class PostitiController {

    public async find(req: Request, res: Response) {

        try {
            const postitis = await getRepository(PostitiEntity).find();
            
            res.send(postitis);
        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async create(req: Request, res: Response) {
        const postiti = req.body;

        try {
            await getRepository(PostitiEntity).save(postiti);
            res.send(postiti);

        } catch(error) {
            res.status(500).send(error);
        }
    }

    public async findById(req: Request, res: Response) {
        const id = req.params.id;

        try {
            //Busca registro pelo ID
            const postiti = await getRepository(PostitiEntity).findOne(id);

            //Se não encontrar, devolve erro 404
            if (!postiti) {
                res.status(404).send('Not found');
                return;    
            }
            
            res.send(postiti);
        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async update(req: Request, res: Response) {
        const id = req.params.id;
        const novo = req.body;

        try {
            //Busca registro pelo ID
            const postiti = await getRepository(PostitiEntity).findOne(id);

            //Se não encontrar, devolve erro 404
            if (!postiti) {
                res.status(404).send('Not found');
                return;    
            }

            await getRepository(PostitiEntity).update(postiti.id, novo);
            
            //Atualiza ID do novo
            novo.id = postiti.id;

            res.send(novo);
        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async delete(req: Request, res: Response) {
        const id = req.params.id;

        try {
            //Busca registro pelo ID
            const postiti = await getRepository(PostitiEntity).findOne(id);

            //Se não encontrar, devolve erro 404
            if (!postiti) {
                res.status(404).send('Not found');
                return;    
            }

            await getRepository(PostitiEntity).delete(postiti);
            
            res.status(204).send();
        } catch (error) {
            res.status(500).send(error);
        }

    }
}
export default new PostitiController();