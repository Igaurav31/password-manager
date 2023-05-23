const { DataTypes } = require("sequelize");
module.exports = function(sequelize, DataTypes) {
    var Userdata = sequelize.define('Userdata', {
        website: DataTypes.STRING, 
        password: DataTypes.STRING,
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
          }
    }, {
        
    });
    
    return Userdata;
}