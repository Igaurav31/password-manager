const { where, Model } = require('sequelize');
const db = require('../models');
const User = db.User;
const Userdata = db.Userdata;


const login = (req, res) => {
    console.log(req.body);
}

module.exports = {
   login
}