// Desc: This file contains the routes for the shortlink API
// import the required modules
const express = require('express');
const router = express.Router();
const shortLinkController = require('../controllers/shortlink');

// GET /shortlinks - Get all shortlinks
router.get('/', shortLinkController.getAllShortLinks);

// GET /shortlinks/:slug - Get a single shortlink
router.get('/:slug', shortLinkController.getSingleShortLink);

// POST /shortlinks - Create a new shortlink
router.post('/', shortLinkController.addNewShortLink);

// PUT /shortlinks/:slug - Edit an existing shortlink
router.put('/:slug', shortLinkController.editShortLink);

// export the router
module.exports = router;
