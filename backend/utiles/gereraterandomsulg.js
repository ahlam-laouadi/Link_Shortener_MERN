// Description: generate a random slug
// generate a random slug
function generateRandomSlug(length = 6) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let slug = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        slug += characters[randomIndex];
    }

    return slug;
}

// export the function
module.exports = generateRandomSlug;