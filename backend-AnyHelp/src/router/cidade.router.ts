import { Router } from "express";
import  CidadeController  from '../controller/cidade.controller';

class CidadeRouter{
    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }
    private init(){
        this.router.get('/', CidadeController.find);
        this.router.post('/', CidadeController.create);
        this.router.get('/:id([0-9]+)', CidadeController.findById);
        this.router.put('/:id([0-9]+)', CidadeController.update);
        this.router.delete('/:id([0-9]+)', CidadeController.delete);

    }
}

export default new CidadeRouter().router;