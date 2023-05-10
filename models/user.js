const { DataTypes } = require("sequelize");
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        email: DataTypes.STRING, //validate email
        password: DataTypes.STRING
    }, {
        // classMethods: {
        // associate: function(models) {
        //     User.hasMany(models.Post);
        // }
        // }
    });
    
    return User;
    }