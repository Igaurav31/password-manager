
const express = require('express');
const session = require('express-session');
const app = express();
require("dotenv").config();
const port = 3000 || process.env.PORT;
app.use(express.static('Frontend'));
app.use(express.urlencoded({ extended: true }));
const db = require('./models');
const User = db.User;
const Userdata = db.Userdata;
const authRoutes = require('./routes/authRoutes');
const passwordRoutes = require('./routes/passwordRoutes');
const { isAuthenticated } = require('./middleware/authMiddleware');
app.set('view engine', 'ejs');
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));


// db.sequelize.sync();

app.use('/', authRoutes);
app.use('/passwords', passwordRoutes)

app.get('/', isAuthenticated, (req, res) => {
  res.sendFile(__dirname + '/Frontend/index.html');
});




app.get('/login', (req, res) => {
  
    res.sendFile(__dirname + '/Frontend/login.html');
  
});

app.get('/register', (req, res) => {
  
    res.sendFile(__dirname + '/Frontend/register.html');
  
});

app.get('/session', (req, res) => {
  res.send(req.session);
});


db.sequelize.sync().then(() => {
  console.log('Database synchronized');
  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
