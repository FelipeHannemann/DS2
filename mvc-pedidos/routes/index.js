const express = require('express');
const clienteRouter = require('./cliente.router');
const vendedorRoutes = require('./vendedor.router'); 
const produtoRoutes = require('./produto.router');
const routes = new express.Router();

routes.use('/cliente',  clienteRouter);
routes.use('/vendedor', vendedorRoutes);
routes.use('/produto', produtoRoutes);

module.exports = routes;