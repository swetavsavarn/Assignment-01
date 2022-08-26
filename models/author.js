const Sequelize = require('sequelize')
const sequelize = require('../db')
const author = sequelize.define('author', {
  
    authorname: {
        type: Sequelize.STRING,
        unique:true,
        autoIncrement:false,
        allowNull:false,
        primaryKey:false,
    }

});
module.exports=author


