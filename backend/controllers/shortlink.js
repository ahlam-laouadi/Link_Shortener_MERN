// Desc: Controller for shortlink routes
// import the required modules
const ShortLink = require('../models/shortlink');
const generateRandomSlug = require("../utiles/gereraterandomsulg");
const isValidUrl = require("../utiles/vaildurl");
const {validatePost, validateEdit} = require("../utiles/validate");

// get all the shortlinks
exports.getAllShortLinks = async (req, res) => {
    try {
        // Fetch all the shortlinks from the database
        const shortLinks = await ShortLink.find();

        // If no shortlinks are found, return an empty list
        if (!shortLinks) {
            return res.status(200).json([]);
        }
        // Return the list of shortlinks as the response
        return res.status(200).json({shortLinks, msg: "Data fetched successfully"});
    } catch (e) {
        // Handle any errors that occur during the process
        res.status(500).json({error: 'Internal server error', msg: e.message});

    }
}

// get a single shortlink
exports.getSingleShortLink = async (req, res) => {
    try {
        const {slug} = req.params; // Extract the slug from the URL parameters

        // Find the shortlink by the slug
        const shortlink = await ShortLink.findOne({slug});

        // If the shortlink doesn't exist, return a 404 response
        if (!shortlink) {
            return res.status(404).json({msg: 'Shortlink not found'});
        }

        // Perform redirection based on the user's platform and availability of URLs
        let redirectURL;
        const userAgent = req.headers['user-agent'];

        if (userAgent.includes('Android')) {
            redirectURL = isValidUrl(shortlink.android.primary) ? shortlink.android.primary : isValidUrl(shortlink.android.fallback) ? shortlink.android.fallback : shortlink.web;
        } else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
            redirectURL = isValidUrl(shortlink.ios.primary) ? shortlink.ios.primary : isValidUrl(shortlink.ios.fallback) ? shortlink.ios.fallback : shortlink.web;
        } else {
            redirectURL = shortlink.web;
        }

        // Redirect the user to the appropriate URL
        // res.redirect(301, redirectURL);
        res.status(200).json(redirectURL);

    } catch (e) {
        // Handle any errors that occur during the process
        res.status(500).json({error: 'Internal server error', msg: e.message});
    }
}

// add a new shortlink
exports.addNewShortLink = async (req, res) => {
    try {
        // Extract the required information from the request body
        const {slug, ios, android, web} = req.body;

        // validate the request body
        if (!validatePost(req)) {
            return res.status(400).json({msg: 'Please provide all the required information'});
        }

        // Generate a unique slug if it's not provided in the request
        const generatedSlug = slug || generateRandomSlug();

        // Check if the generated slug already exists in the database
        const existingSlug = await ShortLink.findOne({slug: generatedSlug});

        // If the slug already exists, return an error
        if (existingSlug) {
            return res.status(400).json({msg: 'Slug already exists'});
        }

        // Create a new shortlink object based on the provided or generated information
        const newShortLink = new ShortLink({
            slug: generatedSlug,
            ios,
            android,
            web
        });

        // Save the new shortlink to the database
        const savedShortLink = await newShortLink.save();

        // Return the created shortlink as the response
        return res.status(201).json({savedShortLink, msg: "Shortlink created successfully"});
    } catch (e) {
        console.log(e)
        // Handle any errors that occur during the process
        res.status(500).json({error: 'Internal server error', msg: e.message});
    }

}


// edit an existing shortlink
exports.editShortLink = async (req, res) => {
    try {
        const {slug} = req.params; // Extract the slug from the URL parameters
        const updates = req.body; // Get the updated attributes from the request body

        // validate the request body
        if (!validateEdit(req)) {
            return res.status(400).json({msg: 'Please provide all the required information'});
        }

        // Find the existing shortlink by the slug
        const existingShortLink = await ShortLink.findOne({slug});

        // If the shortlink doesn't exist, return a 404 response
        if (!existingShortLink) {
            return res.status(404).json({msg: 'Shortlink not found'});
        }

        // Update the attributes of the existing shortlink
        Object.assign(existingShortLink, updates);

        // Save the updated shortlink to the database
        const savedShortLink = await existingShortLink.save();

        // Return the updated shortlink as the response
        return res.status(201).json({savedShortLink, msg: "Shortlink updated successfully"});

    } catch (e) {
        // Handle any errors that occur during the process
        res.status(500).json({error: 'Internal server error', msg: e.message});
    }
}