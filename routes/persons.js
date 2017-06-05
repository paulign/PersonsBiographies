const express = require('express');
const router = express.Router();
const Person = require('../models/person');

router.get('/', function(req, res) {
    return Person.find(function (err, persons) {
        if (!err) {
            return res.send(persons);
        } else {
            res.statusCode = 500;
            return res.send({ error: 'Server error' });
        }
    });
});

router.post('/', function(req, res) {
    var person = new Person({
        fullName: req.body.fullName,
        title: req.body.title,
        quote: req.body.quote,
        steps: req.body.steps,
        photoSrc: req.body.photoSrc,
        wikiLink: req.body.wikiLink
    });

    person.save(function (err) {
        if (!err) {
            return res.send({ status: 'OK', person: person });
        } else {
            console.log(err);
            if(err.name == 'ValidationError') {
                res.statusCode = 400;
                res.send({ error: 'Validation error' });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
            }
        }
    });
});

router.get('/:id', function(req, res) {
    return Person.findById(req.params.id, function (err, person) {
        if(!person) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        if (!err) {
            return res.send({ status: 'OK', person:person });
        } else {
            res.statusCode = 500;
            return res.send({ error: 'Server error' });
        }
    });
});

router.put('/:id', function (req, res){
    return Person.findById(req.params.id, function (err, person) {
        if(!person) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }

        person.fullName = req.body.fullName;
        person.title = req.body.title;
        person.quote = req.body.quote;
        person.steps = req.body.steps;
        person.photoSrc = req.body.photoSrc;
        person.wikiLink = req.body.wikiLink;

        return person.save(function (err) {
            if (!err) {
                return res.send({ status: 'OK', person:person });
            } else {
                if(err.name == 'ValidationError') {
                    res.statusCode = 400;
                    res.send({ error: 'Validation error' });
                } else {
                    res.statusCode = 500;
                    res.send({ error: 'Server error' });
                }
            }
        });
    });
});

router.delete('/:id', function (req, res){
    return Person.findById(req.params.id, function (err, person) {
        if(!person) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        return person.remove(function (err) {
            if (!err) {
                return res.send({ status: 'OK' });
            } else {
                res.statusCode = 500;
                return res.send({ error: 'Server error' });
            }
        });
    });
});

module.exports = router;