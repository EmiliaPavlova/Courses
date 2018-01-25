var express = require('express');
const auth = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

auth.post('/login', (req, res) => {
    const user = {
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
    };
    console.log('login');
    console.log(req.body);

    const token = jwt.sign({ user: user }, 'theMostSecretStringEver', { expiresIn: 7200 });
    res.status(200).json({
        message: 'Successfully logged in',
        token: token,
        user: user.username
    });
})

module.exports = auth;

// https://www.udemy.com/angular-2-and-nodejs-the-practical-guide/learn/v4/t/lecture/5650626?start=0
