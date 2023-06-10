// this fuction is used to validate the request body
exports.validatePost = (req) => {
    const {slug, ios, android, web} = req.body;

    // validate the request body
    return !(!ios || !ios.primary || !ios.fallback || !android || !android.primary || !android.fallback || !web);
}

exports.validateEdit = (req) => {
    const {slug, ios, android, web} = req.body;

    // validate the request body
    return !(!slug || !ios || !ios.primary || !ios.fallback || !android || !android.primary || !android.fallback || !web);
}
