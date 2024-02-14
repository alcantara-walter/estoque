const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

//get user by jwt token

const pegarUsuarioPeloToken = async (token) => {
    if(!token) {
        return res.status(401).json({
            message: 'Acesso Negado!'
        })
    }

    const decoded = jwt.verify(token, 'secret');
    const usuarioId = decoded.id;
    const user = await Usuario.findOne({ where: {id: usuarioId}})

    return user
}

module.exports = pegarUsuarioPeloToken;