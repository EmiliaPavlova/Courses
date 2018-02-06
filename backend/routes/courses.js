const express = require('express');
const api = express.Router();

const data = require('../data.json');

api.get('/', (req, res) => {
    let { page, size } = req.query;
    page = parseInt(page, 10) || 1;
    size = parseInt(size, 10) || 3;
    const start = (page - 1) * size;
    const end = start + size;
    const slicedCourses = data.courses.slice(start, end);
    res.json(slicedCourses);
})

api.get('/all', (req, res) => {
    res.json(data.courses);
})

api.get('/search', (req, res) => {
    const { q } = req.query;
    const filteredCourses = data.courses.filter(course =>
        course.name && course.name.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        course.description && course.description.toLowerCase().indexOf(q.toLowerCase()) > -1);
    res.json(filteredCourses);
})

api.get('/authors', (req, res) => {
    res.json(data.authors);
})


api.get('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const result = data.courses.filter(course => course.id === id);
    res.json(result);
})

api.delete('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const course = data.courses.find(c => c.id === id);
    if (!course) {
        res.status(500).json({
            title: 'Course not found',
            error: { message: 'The course could not be found'}
        });
    } else {
        res.status(200).send('Course deleted');
    }
    // const result = data.courses.filter(course => course.id !== id);
    // res.json(result);
})

api.post('/', (req, res) => {
    courses.push(req.body);
    res.sendStatus(200);
})

module.exports = api;