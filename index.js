const express = require('express');
const app = express();
require("dotenv").config();
const port = 3000 || process.env.PORT;
app.use(express.static('Frontend'));
app.use(express.urlencoded({ extended: true }));
const db = require('./models');
const userCtrl = require('./controllers/userController');
const user = require('./models/user');
db.sequelize.sync();
app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/Frontend/login.html');
    }
);

app.post('/login',userCtrl.login)


app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/Frontend/register.html');
    }
);

app.post('/register', (req, res) => {
    console.log(req.body);
    res.send('POST request to the homepage');
    }
); 

app.listen(port, () => {
    console.log('Example app listening at http://localhost:${port}');
    }
);