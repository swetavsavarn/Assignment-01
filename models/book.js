const Sequelize = require('sequelize')
const sequelize = require('../db')
const book = sequelize.define('book', {
  
    authorID: {
        type: Sequelize.STRING,
        unique:false,
        autoIncrement:false,
        allowNull:false,
        primaryKey:false,
    },
    bookName: {
        type: Sequelize.STRING,
        autoIncrement:false,
        allowNull:false,
        primaryKey:false,
    },
    ISBN: {
        type: Sequelize.STRING,
        unique:true,
        autoIncrement:false,
        allowNull:false,
        primaryKey:false,
    }
   

});
module.exports=book