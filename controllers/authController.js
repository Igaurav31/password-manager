const { where } = require('sequelize');
const db = require('../models');
const User = db.User;
const bcrypt = require('bcrypt');


const register = async (req, res) => {
  try {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const isValidPassword = passwordRegex.test(req.body.password);

    // if (!isValidPassword) {
    //   console.log('Weak password');
    //   // return res.status(400).json({
    //   //   message: 'Weak password. Please ensure your password is at least 8 characters long and includes at least one lowercase letter, one uppercase letter, and one number.'
    //   // });
    //   req.flash('error', 'Weak password. Please ensure your password is at least 8 characters long and includes at least one lowercase letter, one uppercase letter, and one number.');
    //   res.redirect('/register');
    //   return;
    // }
    if (!isValidPassword) {
      req.flash('error', 'Weak password. Please ensure your password is at least 8 characters long and includes at least one lowercase letter, one uppercase letter, and one number.');
      return res.render('register', { error: req.flash('error') });
    }
    const hashedPassword = await bcrypt.hashSync(req.body.password, 10);
    const user = await User.create({
      email: req.body.email,
      password: hashedPassword
    });
    req.session.userId = user.id;
    res.redirect('/login');
    console.log('Added user');
  } catch (err) {
    console.log(err);
    req.flash('error', 'An error occurred. Please try again.');
    res.redirect('/register');
  }
};

const login = (req, res) => {
  const { email, password } = req.body;
  console.log(`${email} is trying to log in`);
  User.findOne({ where: { email: email } }).then((user) => {
    if (!user) {
      req.flash('error', 'No user with that email exists. Please try again.');
      return res.render('login', { error: req.flash('error') });
      // console.log('no user');
      // res.redirect('/login');
    } else if (!password) {
      req.flash('error', 'password is required');
      return res.render('login', { error: req.flash('error') });
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          req.session.userId = user.id;
          console.log('logged in');
          res.redirect('/');
        } else {
          req.flash('error', 'Incorrect password. Please try again.');
      return res.render('login', { error: req.flash('error') });
        }
      });
    }
  });
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('logged out');
      res.redirect('/login');
    }
  });
};



module.exports = {
  register,
  login,
  logout
};
