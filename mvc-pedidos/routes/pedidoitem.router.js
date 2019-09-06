const express = require('express');
const routes = express.Router();
const pedidoitemController = require('../controller/pedidoitem.controller');

routes.get('/', pedidoitemController.find);
routes.post('/', pedidoitemController.create);
routes.get('/:id([0-9]+)', pedidoitemController.findByID);
routes.put('/:id([0-9]+)', pedidoitemController.update);
routes.delete('/:id([0-9]+)', pedidoitemController.delete);

module.exports = routes;