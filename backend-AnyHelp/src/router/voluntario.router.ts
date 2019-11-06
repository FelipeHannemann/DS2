import { Router } from "express";
import  VoluntarioController  from '../controller/voluntario.controller';

class VoluntarioRouter{
    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }
    private init(){
        this.router.get('/', VoluntarioController.find);
        this.router.post('/', VoluntarioController.create);
        this.router.get('/:id([0-9]+)', VoluntarioController.findById);
        this.router.put('/:id([0-9]+)', VoluntarioController.update);
        this.router.delete('/:id([0-9]+)', VoluntarioController.delete);
        

    }
}

export default new VoluntarioRouter().router;