const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
// const courses = require('./courses.json');

const courses = [{
    "id": 1,
    "name": "No name",
    "duration": 210,
    "topRated": true,
    "date": "2017-12-31",
    "description": "Some description"
  }, {
    "id": 2,
    "name": "Video course 1",
    "duration": 88,
    "topRated": true,
    "date": "2018-02-6",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sollicitudin iaculis arcu sit amet lobortis. Donec vehicula urna bibendum tincidunt auctor. Praesent eu sem blandit, placerat purus et, facilisis metus. Vestibulum et ante lorem. Suspendisse et ultrices leo. Suspendisse sagittis varius orci pretium mattis. Duis congue eros consequat neque gravida finibus. Suspendisse tortor leo, mattis sed velit non, pulvinar mollis massa. Nunc a porttitor ipsum."
  },
  {
    "id": 3,
    "name": "Video course 2",
    "duration": 15,
    "topRated": false,
    "date": "2018-01-12",
    "description": "Integer viverra urna et accumsan volutpat. Sed eget nisi aliquet, mattis nisl ac, feugiat arcu. Maecenas interdum ipsum et purus rhoncus, et porttitor odio tempor. Mauris malesuada congue accumsan. Quisque dignissim, magna at tincidunt efficitur, ipsum ligula mattis lacus, sit amet ullamcorper lorem justo quis sem. Proin nec purus purus. In hac habitasse platea dictumst. Donec lectus ipsum, vulputate quis tristique quis, pulvinar eget ante."
  },
  {
    "id": 4,
    "name": "Video course 3",
    "duration": 135,
    "topRated": true,
    "date": "2018-01-18",
    "description": "Donec semper sem nec scelerisque mollis. Duis malesuada risus ut tincidunt rhoncus. Suspendisse eros nisl, imperdiet eget consequat eget, aliquam vel elit."
  }
];
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
    let { page } = req.query;
    let { size } = req.query;
    console.log(req.query)
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