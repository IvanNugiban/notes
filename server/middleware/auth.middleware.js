const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) {
    if (req === "OPTIONS") {
        return next();
    }
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (token === "null") {
            return res.status(401).json("Auth error");
        }
        const decodedUserId = jwt.verify(token, config.get("secretKey"));
        req.user = decodedUserId;
        next();
    }
    catch(e) {
        console.log(e);
        return res.status(500).json("Server error");
    }
}

module.exports = auth;