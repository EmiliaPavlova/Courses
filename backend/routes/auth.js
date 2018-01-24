var express = require('express');
const auth = express.Router();
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

auth.post('/auth', (req, res) => {
    const user = {
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
    };
    console.log('login');
    console.log(req.body);
    // const index = users.push(req.body) - 1;
    // const user = users[index];
    // user.id = index;
    // const token = jwt.sign(user.id, 'theMostSecretStringEver');
    // res.json(token);
})

module.exports = auth;

// https://www.udemy.com/angular-2-and-nodejs-the-practical-guide/learn/v4/t/lecture/5650626?start=0
