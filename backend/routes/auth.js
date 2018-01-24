var express = require('express');
const auth = express.Router();

auth.post('/login', (req, res) => {
    console.log('login');
    // const index = users.push(req.body) - 1;
    // const user = users[index];
    // user.id = index;
    // const token = jwt.sign(user.id, 'theMostSecretStringEver');
    // res.json(token);
})

module.exports = auth;