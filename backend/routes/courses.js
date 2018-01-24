var express = require('express');
var api = express.Router();

const courses = require('../courses.json');

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
    const course = courses.courses.find(c => c.id === id);
    if (!course) {
        res.status(500).send('Course not found')
    } else {
        res.status(200).send('Course deleted');
    }
    // const result = courses.courses.filter(course => course.id !== id);
    // res.json(result);
})

api.post('/courses', (req, res) => {
    courses.push(req.body);
    res.sendStatus(200);
})

module.exports = api;