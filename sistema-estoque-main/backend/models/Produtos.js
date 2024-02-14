const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Usuario = require ('./Usuario');


const Produtos = db.define('Produtos', {
    produto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantidade: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    codigo: {
        type: DataTypes.MEDIUMINT,
        allowNull: false,

    }
})

Produtos.belongsTo(Usuario);
Usuario.hasMany(Produtos);

module.exports = Produtos;