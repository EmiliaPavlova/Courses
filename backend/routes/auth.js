var express = require('express');
const auth = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

auth.post('/', (req, res) => {
    const user = {
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8),
    };
    const token = jwt.sign({user: user.username}, 'secret', {expiresIn: 7200});
    res.status(200).json({
        Message: 'Successfully logged in',
        token: token,
        user: user.username
    });
})

module.exports = auth;

// https://www.udemy.com/angular-2-and-nodejs-the-practical-guide/learn/v4/t/lecture/5650626?start=0
