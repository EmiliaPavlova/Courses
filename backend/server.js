const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const courses = require('./courses.json');

const app = express();
const users = [];

// body-parser middleware
app.use(bodyParser.json());

// middleware for course 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
    next();
})

// create new router
const api = express.Router();
const auth = express.Router();

api.get('/courses', (req, res) => {
    let { page, size } = req.query;
    page = parseInt(page, 10) || 1;
    size = parseInt(size, 10) || 3;
    const start = (page - 1) * size;
    const end = start + size;
    const slicedCourses = courses.courses.slice(start, end);
    res.json(slicedCourses);
})

api.get('/courses/all', (req, res) => {
    res.json(courses);
})

api.get('/courses/search', (req, res) => {
    const { q } = req.query;
    const filteredCourses = courses.courses.filter(course =>
        course.name && course.name.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        course.description && course.description.toLowerCase().indexOf(q.toLowerCase()) > -1);
    res.json(filteredCourses);
})


api.get('/courses/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const result = courses.courses.filter(course => course.id === id);
    res.json(result);
})

api.delete('/courses/delete/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const result = courses.courses.filter(course => course.id !== id);
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

const port = process.env.PORT || '4204';
app.set('port', port);

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

app.use((req, res) => res.render('index'));

// https://malcoded.com/posts/angular-backend-express
