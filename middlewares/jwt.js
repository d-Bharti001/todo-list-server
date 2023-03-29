const jwt = require("jsonwebtoken");

const verifyJwt = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (token) {
        let verified = jwt.verify(token, process.env.JWT_SECRETPHRASE);
        req.user = {
            id: verified.id,
            email: verified.email
        };
        return next();
    } else {
        return res.status(400).json({ message: "Authentication failed.", isLoggedIn: false });
    }
};

module.exports = {
    verifyJwt
};
