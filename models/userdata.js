const { DataTypes } = require("sequelize");
module.exports = function(sequelize, DataTypes) {
    var Userdata = sequelize.define('Userdata', {
        website: DataTypes.STRING, 
        password: DataTypes.STRING
    }, {
        
    });
    
    return Userdata;
}