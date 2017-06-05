const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const PersonSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    title: {
        type: String,
    },
    quote: {
        type: String,
    },
    steps: {
        type: [Object]
    },
    photoSrc: {
        type: String,
    },
    wikiLink: {
        type: String,
    }
});

const Person = module.exports = mongoose.model('Person', PersonSchema);

