import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { ClienteEntity } from '../entity/cliente.entity';

class ClienteController {

    public async find(req: Request, res: Response) {
        try {
            //await espera terminar para ir para a proxima linha
            const clientes = await getRepository(ClienteEntity).find();
            res.send(clientes);

        } catch (error) {
            res.status(500).send(error);
        }


    }

    public async create(req: Request, res: Response) {

        const cliente = req.body;

        try {
            await getRepository(ClienteEntity).save(cliente);
            res.send(cliente);

        } catch (error) {
            res.status(500).send(error);
        }



    }
}

export default new ClienteController