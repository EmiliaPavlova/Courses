const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const courses = require('./courses.json');

const users = [];

// body-parser middleware
app.use(bodyParser.json());

// middleware for course 
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

// create new router
const api = express.Router();
const auth = express.Router();

api.get('/courses', (req, res) => {
    let { page, size } = req.query;
    console.log(req.query);
    res.json(courses);
})

api.get('/courses/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const result = courses.filter(course => course.id === id);
    res.json(result);
})

api.post('/courses', (req, res) => {
    courses.push(req.body);
    res.sendStatus(200);
})

auth.post('/login', (req, res) => {
    console.log('login');
    // const index = users.push(req.body) - 1;
    // const user = users[index];
    // user.id = index;
    // const token = jwt.sign(user.id, 'theMostSecretStringEver');
    // res.json(token);
})

app.use('/', api);
app.use('/auth', auth);

app.listen(4204, () => {
    console.log('Server is running on 4204');
});