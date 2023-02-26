const jwt = require("jsonwebtoken");
const JWT_SECRET = "Dhairya#is#a#good#boy"


const getUser = (req, res, next)=> {
    // get user from jwttoken and add id to the req object.
    const token = req.header('authToken');
    if(!token){
        return res.status(401).send({"error" : "Please authenticate using a valid token."});
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).send({"error" : "Please authenticate using a valid token."});
    }

};

module.exports = getUser;