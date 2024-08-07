const jwt = require("jsonwebtoken");
require('dotenv').config();
const jwtToken = process.env.JWT_TOKEN_KEY;
const isAuthenticated = async (req, res, next) => {
    //! Get the token from the header
    const headerObj = req.headers;
    const token = headerObj?.authorization?.split(" ")[1];
    //!Verify the token
    const verifyToken = jwt.verify(token, jwtToken, (err, decoded) => {
        if (err) {
            return false;
        } else {
            return decoded;
        }
    });
    if (verifyToken) {
        //!Save the user req obj
        req.user = verifyToken.id;
        next();
    } else {
        const err = new Error("Token expired, login again");
        next(err);
    }
};

module.exports = isAuthenticated;