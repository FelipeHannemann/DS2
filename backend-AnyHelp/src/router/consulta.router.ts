import { Router } from "express";
import  consultaController  from '../controller/consulta.controller';

class ConsultaRouter{
    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }
    private init(){
        this.router.get('/', consultaController.find);
        this.router.post('/', consultaController.create);
        this.router.get('/:id([0-9]+)', consultaController.findById);
        this.router.put('/:id([0-9]+)', consultaController.update);
        this.router.delete('/:id([0-9]+)', consultaController.delete);

    }
}

export default new ConsultaRouter().router;