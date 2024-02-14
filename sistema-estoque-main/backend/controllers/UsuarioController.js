const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//helpers
const criarTokenUsuario = require('../helpers/autenticado');
const pegarToken = require('../helpers/pegar-token');
const pegarUsuarioPeloToken = require('../helpers/pegar-usuario-pelo-token');


module.exports = class UsuarioController {

    static async registrar(req, res) {
        const {nome, senha, confirmarsenha} = req.body;
        let {matricula} = req.body
        matricula = Number(matricula);

        //chechar se algum campo nao esta completo

        if(!nome) {
            res.status(422).json({message: 'Complete o campo nome'})
            return
        }

        if(!senha) {
            res.status(422).json({message: 'Complete o campo senha'})
            return
        }

        if(!confirmarsenha) {
            res.status(422).json({message: 'Confirme sua senha'})
            return
        }

        if(senha !== confirmarsenha) {
            res.status(422).json({ message: 'A senha é diferente da confirmação de senha'})
            return
        }

        if(!matricula) {
            res.status(422).json({message: 'Complete sua matricula ou insira numeros'})
            return
        }

        if (!Number.isInteger(matricula) || matricula <= 0 ) {
            res.status(422).json({ message: "A matricula deve ser um numero e maior que 0" });
            return;
        }

        //checar se usuario ja existe
        const usuarioExiste = await Usuario.findOne( {where: {matricula: matricula}})

        if(usuarioExiste) {
            res.status(422).json({
                message: 'Esta matrícula ja possui cadastro no sistema.'
            })
            return
        }

        //bcrypt
        const salt = await bcrypt.genSalt(12);
        const senhaHash = await bcrypt.hash(senha, salt);

        //criando usuario
        const usuario = new Usuario ({
            nome,
            senha: senhaHash,
            matricula,
        })

        try {
            const novoUsuario = await usuario.save();
            await criarTokenUsuario(novoUsuario, req, res); //helpers autenticado
            
        } catch (error) {
            res.status(500).json({ message: 'erro de autenticacao registrado ' + error})
        }
    }

    static async logar(req, res) {
        const {matricula, senha} = req.body;

        if (!matricula) {
            res.status(422).json({ message: 'Preencha a matrícula' });
            return
        }

        if (!senha) {
            res.status(422).json({ message: 'Insira sua senha' });
            return
        }

        //checar se o usuario existe
        const usuario = await Usuario.findOne({ where: {matricula: matricula}})

        if(!usuario) {
            res.status(422).json({
                message: ('Estra matricula nao tem registro no sistema')
            })
            return
        }

        //checar se a senha é a mesma que a senha do banco de dados(bcrypt)
        const checarSenha = await bcrypt.compare(senha, usuario.senha);

        if(!checarSenha) {
            res.status(422).json({
                message: ('Senha invalida')
            })
            return
        }
       
        await criarTokenUsuario(usuario, req, res)
        
    }

    static async checarUsuario(req, res) {
        let usuario;

        if(req.headers.authorization) {
            const token = pegarToken(req);
            const decodificar = jwt.verify(token, 'secret');

            usuario = await Usuario.findOne({ where: {id: decodificar.id}})
            usuario.senha = undefined
        } else {
            usuario = null
        }

        res.status(200).send(usuario)
    }

    static async pegarMatricula(req, res) {
        const matricula = parseInt(req.params.matricula);

        if(matricula != req.params.matricula) {
            res.status(400).json({
                message: "Matricula invalida"
            })
            return;
        }

        const usuario = await Usuario.findOne(
            {where: {matricula: matricula},
            attributes: {exclude: ['senha']}})
            
            if (!usuario) {
                res.status(422).json({
                    message: 'Usuario nao encontrado'
                })
                return
            }
            res.status(200).json({usuario})
    }

    static async editarSenha(req, res) {
        const matricula = req.params.matricula;

        const token = pegarToken(req);
        const usuario = await pegarUsuarioPeloToken(token);

        const {novaSenha, confirmarNovaSenha, senha} = req.body;
        

        //validacoes
        if(!novaSenha) {
            res.status(422).json({ message: 'Insira uma nova senha'})
            return
        }

        if(!confirmarNovaSenha) {
            res.status(422).json({ message: 'Confirme sua nova senha'})
            return
        }

        if(novaSenha !== confirmarNovaSenha) {
            res.status(422).json({ message: 'Senha e confirmaçao sao diferentes'})
            return
        }

        if (!senha) {
            res.status(422).json({ message: 'Insira sua senha antiga'})
            return
        }

        //check if password is the same as db password
        const checarSenha = await bcrypt.compare(senha, usuario.senha )

        if(!checarSenha) {
            res.status(422).json({
                message: ('Senha invalida')
            }) 
            return
        }

            const salt = await bcrypt.genSalt(12);
            const senhaHash = await bcrypt.hash(novaSenha, salt);
            usuario.senha = senhaHash;

        try {

            //alterando a senha
             await Usuario.update(
                {senha: usuario.senha}, {where: {id: usuario.id}}
            );
            res.status(200).json({ message: 'Senha alterada com sucesso' });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Internal Server Error' });
        }


    }
    
}
