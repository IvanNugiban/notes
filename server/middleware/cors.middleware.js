function cors(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'https://notes-ua.herokuapp.com');
    res.header('Access-Control-Allow-Methods', "GET, PUT, PATCH, OPTIONS, POST, DELETE");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization' );

    next();
}

module.exports = cors;