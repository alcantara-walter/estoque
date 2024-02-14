const jwt = require('jsonwebtoken');
const pegarToken = require('./pegar-token');


//middleware validar token;
const verificarToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: 'Acesso negado!'
        })
    }

    const token = pegarToken(req) 

    if(!token) {
        return res.status(401).json({
            message: 'Acesso negado!'
        })
    }

    try {
        const verificado = jwt.verify(token, 'secret') 
        req.user = verificado
        next()
    } catch(err) {
        return res.status(400).json({
            message: 'Token Invalido'
        })
    }

    
}
module.exports = verificarToken