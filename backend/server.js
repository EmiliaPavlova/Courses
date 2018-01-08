const express = require('express');
const app = express();
const bodyParser = require('body-parser');

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
    "date": "2018-1-12",
    "description": "Integer viverra urna et accumsan volutpat. Sed eget nisi aliquet, mattis nisl ac, feugiat arcu. Maecenas interdum ipsum et purus rhoncus, et porttitor odio tempor. Mauris malesuada congue accumsan. Quisque dignissim, magna at tincidunt efficitur, ipsum ligula mattis lacus, sit amet ullamcorper lorem justo quis sem. Proin nec purus purus. In hac habitasse platea dictumst. Donec lectus ipsum, vulputate quis tristique quis, pulvinar eget ante."
  },
  {
    "id": 4,
    "name": "Video course 3",
    "duration": 135,
    "topRated": true,
    "date": "2018-1-18",
    "description": "Donec semper sem nec scelerisque mollis. Duis malesuada risus ut tincidunt rhoncus. Suspendisse eros nisl, imperdiet eget consequat eget, aliquam vel elit."
  }
];

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

api.get('/courses', (req, res) => {
    res.json(courses);
})

api.post('/courses', (req, res) => {
    courses.push(req.body);
    res.sendStatus(200);
})

app.use('/api', api);

app.listen(4204);