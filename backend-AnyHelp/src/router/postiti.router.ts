import { Router } from "express";
import  postitiController  from '../controller/postiti.controller';

class PostitiRouter{
    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }
    private init(){
        this.router.get('/', postitiController.find);
        this.router.post('/', postitiController.create);
        this.router.get('/:id([0-9]+)', postitiController.findById);
        this.router.put('/:id([0-9]+)', postitiController.update);
        this.router.delete('/:id([0-9]+)', postitiController.delete);
    }
}

export default new PostitiRouter().router;