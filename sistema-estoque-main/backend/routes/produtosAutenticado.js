const express = require('express');
const router = express.Router();

const ProdutosController = require('../controllers/ProdutosController');
const Produtos = require ('../models/Produtos');

//middlewares
const verificarToken = require('../helpers/verificar-token');

//routes
router.get('/estoque', verificarToken, ProdutosController.estoque)
router.post('/criarProduto', verificarToken, ProdutosController.criarProduto)
router.patch('/acrescentarQuantidade', verificarToken, ProdutosController.acrescentarQuantidade)
router.patch('/removerQuantidade', verificarToken, ProdutosController.removerQuantidade)
router.delete('/removerProduto', verificarToken, ProdutosController.removerProduto)
router.get('/:codigo', verificarToken, ProdutosController.codigo)


module.exports = router

