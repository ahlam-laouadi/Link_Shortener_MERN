// Desc: model for shortlink
// import mongoose
const mongoose = require('mongoose');

// create a schema
const shortLinkSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: true,
        unique: true
    },
    ios: {
        primary: {
            type: String,
            required: true,
        },
        fallback: {
            type: String,
            required: true,
        }
    },
    android: {
        primary: {
            type: String,
            required: true,
        },
        fallback: {
            type: String,
            required: true,
        }
    },
    web: {
        type: String,
        required: true,
    }
});

// create a model
const ShortLink = mongoose.model('ShortLink', shortLinkSchema);

// export the model
module.exports = ShortLink;