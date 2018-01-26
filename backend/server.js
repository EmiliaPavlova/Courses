const express = require('express');
const bodyParser = require('body-parser');

const api = require('./routes/courses');
const auth = require('./routes/auth');

const app = express();
const users = [];

// body-parser middleware
app.use(bodyParser.json());

// middleware for course 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', '*');
    next();
})

app.use('/courses', api);
app.use('/login', auth);

const port = process.env.PORT || '4204';
app.set('port', port);

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

app.use((req, res) => res.render('index'));

// https://malcoded.com/posts/angular-backend-express
