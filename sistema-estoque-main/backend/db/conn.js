const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Estoque', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

try {
    sequelize.authenticate()
    console.log('Conectado com sucesso na porta 3333!')
}catch(err) {
    console.log(err)
}

module.exports = sequelize;