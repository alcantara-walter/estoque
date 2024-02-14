const Produtos = require('../models/Produtos');
const Usuario = require('../models/Usuario');

const { Op, where } = require('sequelize');

//helpers
const pegarToken = require('../helpers/pegar-token');
const pegarUsuarioPeloToken = require('../helpers/pegar-usuario-pelo-token');

module.exports = class ProdutosController {

    static async estoque(req, res) {

        const token = pegarToken(req);
        const usuario = await pegarUsuarioPeloToken(token)

        const produtos = await Produtos.findAll({
           
        });

        if(!produtos) {
            res.status(404).json({
                message: 'Nao encontrado'
            })
        }

        console.log(produtos)

        res.status(200).json({
            produtos: produtos
        })
    }

    static async criarProduto(req, res) {
        const {produto, quantidade, codigo} = req.body;

        if (!produto) {
            res.status(422).json({ message: "Você deve inserir um produto" })
            return
        }

        if(!quantidade) {
            res.status(422).json({message: "Voce deve inserir uma quantidade, caso nao haja, coloque: 0."})
            return
        }

        if (!Number.isInteger(Number(quantidade)) || Number(quantidade) < 0) {
            res.status(422).json({message: "A quantidade deve ser um número inteiro positivo."});
            return;
        }

        if(!codigo) {
            res.status(422).json({message: "Insira um código para o produto" })
            return
        }

        if (!Number.isInteger(Number(codigo)) || Number(codigo) < 0) {
            res.status(422).json({message: "O código deve ser um número inteiro positivo."});
            return;
        }

        const codigoExiste = await Produtos.findOne({where: {codigo: codigo}})

        if(codigoExiste) {
            res.status(422).json({
                message: 'Este código ja pertence a outro item'
            })
            return
        }

        const token = pegarToken(req);
        const usuario = await pegarUsuarioPeloToken(token);
        console.log(usuario)

        const produtos = new Produtos({
            produto,
            quantidade,
            codigo,
            UsuarioId: usuario.id, 
        })

        try {
            const novoProduto = await produtos.save()
            res.status(201).json({
                message: "Produto salvo no sistema com sucesso!",
                novoProduto,
            })

        } catch (error) {
            res.status(500).json({message: error})
        }


    }
    
    static async codigo (req, res) {
        const codigo = req.params.codigo;

        if (codigo != req.params.codigo) {
            res.status(422).json({message: "Pagina nao encontrada1"})
            return
        }

        const produtos = await Produtos.findOne({where: {codigo: codigo}})

        if(!produtos) {
            res.status(404).json({message: 'Pagina nao encontrada'})
        }

        res.status(200).json({
            produtos: produtos,
        })
    }
    
    static async acrescentarQuantidade(req, res) {
        const codigo = req.body.codigo
        let acrescentar = req.body.quantidade;
        
        const token = pegarToken(req);
        const usuario = pegarUsuarioPeloToken(token);

        const produtos = await Produtos.findOne({
            where: {
                codigo: codigo,
            }
        })
        

        if(!produtos) {
            res.status(404).json({ message: "Produto nao encontrado"})
            return
        }

        if(!acrescentar) {
            res.status(422).json({message: "Digite a quantidade comprada"})
            return
        } else {
            acrescentar = parseInt(acrescentar)
        }

        if (!Number.isInteger(acrescentar) || acrescentar <= 0) {
            res.status(422).json({ message: "A quantidade a acrescentar deve ser um número inteiro e maior que 0." });
            return;
        }

        produtos.quantidade += acrescentar

        await produtos.save()

        res.status(200).json({
            message: "Quantidade acrescentada com sucesso ao sistema!"
        })        
        
    }

    static async removerQuantidade(req, res) {
        const codigo = req.body.codigo;
        let remover = req.body.quantidade;
        
        const token = pegarToken(req);
        const usuario = pegarUsuarioPeloToken(token);

        if (!codigo) {
            res.status(422).json({message: "Insira um codigo válido"})
            return
        }

        const produtos = await Produtos.findOne({where: {codigo: codigo}});

        if(!produtos) {
            res.status(404).json({message: 'Produto nao encontrado!'})
            return
        }

        if(remover > produtos.quantidade) {
            res.status(422).json({message: "O valor que deseja remover é maior do que a que possui no estoque"})
            return
        }

        if(!remover) {
            res.status(422).json({message: 'Digite a quantidade que deseja remover'})
            return
        } else {
            remover = parseInt(remover)
        }

        if (!Number.isInteger(remover) || remover <= 0) {
            res.status(422).json({ message: "A quantidade a remover deve ser um número inteiro e maior que 0." });
            return;
        }

        produtos.quantidade -= remover;
        await produtos.save()
       

        res.status(200).json({
            message: "Quantidade removida com sucesso do sistema!"
        })   


    }
    
    static async removerProduto(req, res) {
        const token = pegarToken(req);
        const usuario = await pegarUsuarioPeloToken(token);
        const codigo = req.body.codigo;

        const removerProduto = await Produtos.findOne({
            where: {
                codigo: codigo
            }
        })

        if(!removerProduto) {
            res.status(404).json({
                message: "Produto nao encontrado"
            })
            return
        }

        await removerProduto.destroy();

        res.status(200).json({
            message: "Produto removido com sucesso do sistema!"
        })

    }

}