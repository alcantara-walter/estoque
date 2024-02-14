const { DataTypes } = require('sequelize');
const db = require ('../db/conn');
const Usuario = db.define('Usuario', {
    nome: {
        type:DataTypes.STRING,
        allowNull: false,
    },
    senha: {
        type:DataTypes.STRING,
        allowNull: false,
    },
    matricula: {
        type:DataTypes.STRING,
        allowNull: false
    }
},
{
    timestamps: true
})

module.exports = Usuario