import { Router } from "express";
import  ClienteController  from '../controller/cliente.controller';

class CidadeRouter{
    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }
    private init(){
        this.router.get('/', ClienteController.find);
        this.router.post('/', ClienteController.create);
        this.router.get('/:id([0-9]+)', ClienteController.findById);
        this.router.put('/:id([0-9]+)', ClienteController.update);
        this.router.delete('/:id([0-9]+)', ClienteController.delete);
        

    }
}

export default new CidadeRouter().router;