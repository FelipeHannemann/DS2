import { Router } from "express";
import  PedidoController  from '../controller/pedido.controller';

class PedidoRouter{
    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }
    private init(){
        this.router.get('/', PedidoController.find);
        this.router.post('/', PedidoController.create);
        this.router.get('/:id([0-9]+)', PedidoController.findById);
        this.router.put('/:id([0-9]+)', PedidoController.update);
        this.router.delete('/:id([0-9]+)', PedidoController.delete);
        

    }
}

export default new PedidoRouter().router;