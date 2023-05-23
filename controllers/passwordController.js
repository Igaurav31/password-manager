const { where } = require('sequelize');
const db = require('../models');
const Userdata = db.Userdata;
const bcrypt = require('bcrypt');

const getPasswords = async (req, res) => {
    try {
      const userId = req.session.userId;
      const passwords = await Userdata.findAll({
        where: { userId: userId },
      });
      res.render('passwords', { passwords }); 
    } catch (err) {
      console.log(err);
    }
  };
  
const addPassword = async (req, res) => {
    try {
        console.log('trying to add password');
        const password = await Userdata.create({
        website: req.body.websiteinput,
        password: req.body.passwordinput,
        userId: req.session.userId,
        });
        res.redirect('/passwords'); 
    } catch (err) {
        console.log(err);
    }
    }   

const updatePassword = async (req, res) => {
    try {
        const password = await Userdata.update(
        { password: req.body.password },
        { where: { id: req.params.id, userId: req.session.userId } }
        );
        res.send(password);
    } catch (err) {
        console.log(err);
    }
    }

const deletePassword = async (req, res) => {
    try {
        const password = await Userdata.destroy({
        where: { id: req.params.id, userId: req.session.userId },
        });
        res.send(password);
    } catch (err) {
        console.log(err);
    }
    }

module.exports = {
    getPasswords,
    addPassword,
    updatePassword,
    deletePassword,
};