import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { EstadoEntity } from '../entity/estado.entity';

class EstadoController {

    public async find(req: Request, res: Response) {
        try {
            //await espera terminar para ir para a proxima linha
            const estados = await getRepository(EstadoEntity).find();
            res.send(estados);

        } catch (error) {
            res.status(500).send(error);
        }


    }

    public async create(req: Request, res: Response) {

        const estado = req.body;

        try {
            await getRepository(EstadoEntity).save(estado);
            res.send(estado);

        } catch (error) {
            res.status(500).send(error);
        }



    }
}

export default new EstadoController