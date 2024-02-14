const express = require('express');
const router = express.Router();


//controllers

//middleware 
const criarTokenUsuario = require('../helpers/autenticado')
const verificarToken = require('../helpers/verificar-token');
const UsuarioController = require('../controllers/UsuarioController');

//rotas
router.post('/registrar', UsuarioController.registrar);
router.post('/logar', UsuarioController.logar);
router.get('/checarUsuario', UsuarioController.checarUsuario);
router.get('/:matricula', UsuarioController.pegarMatricula)
router.patch('/editar/:matricula', verificarToken, UsuarioController.editarSenha);



module.exports = router