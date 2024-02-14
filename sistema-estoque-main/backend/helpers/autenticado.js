const jwt = require('jsonwebtoken');
const criarTokenUsuario = async(usuario, req, res) => {
    //criar token
    const token = jwt.sign({
        name: usuario.nome,
        id: usuario.id
    }, "secret")

    //retornar token
    res.status(200).json({
        message: "Autenticado!",
        token: token,
        usuarioId: usuario.id
    })
}

module.exports = criarTokenUsuario