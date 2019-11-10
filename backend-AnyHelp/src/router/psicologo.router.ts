import { Router } from "express";
import  psicologoController  from '../controller/psicologo.controller';

class PsicologoRouter{
    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }
    private init(){
        this.router.get('/', psicologoController.find);
        this.router.post('/', psicologoController.create);
        this.router.get('/:id([0-9]+)', psicologoController.findById);
        this.router.put('/:id([0-9]+)', psicologoController.update);
        this.router.delete('/:id([0-9]+)', psicologoController.delete);
    }
}

export default new PsicologoRouter().router;