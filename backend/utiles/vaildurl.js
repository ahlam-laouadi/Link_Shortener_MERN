// function that check if the url is valid or not
function isValidUrl(url) {
    return /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(url);

}

module.exports = isValidUrl;
