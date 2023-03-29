const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const _createToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRETPHRASE, { expiresIn: "2d" });
}

const _getUserInfo = (user) => {
    return { id: user._id, email: user.email };
}

const signup = async (req, res) => {
    const user = req.body;
    if (!user?.email || !user?.password) {
        return res.status(400).json({ message: "Email and password required." });
    }
    try {
        let dbUser = await User.findOne({ email: user.email });
        if (dbUser) {
            return res.status(400).json({ message: "User already exists." });
        }
        let password = await bcrypt.hash(user.password, 9);
        let newUser = await User.create({
            email: user.email,
            password: password
        });
        let token = _createToken(newUser);
        return res.status(200).json({
            message: "Successful",
            user: _getUserInfo(newUser),
            token: `Bearer ${token}`
        });
    } catch (err) {
        return res.status(500).json({ message: "Some error occurred." });
    }
};

const login = async (req, res) => {
    const user = req.body;
    if (!user?.email || !user?.password) {
        return res.status(400).json({ message: "Email and password required." });
    }
    try {
        const dbUser = await User.findOne({ email: user.email });
        if (!dbUser) {
            return res.status(404).json({ message: "User doesn't exist." });
        }
        const passMatched = await bcrypt.compare(user.password, dbUser.password);
        if (!passMatched) {
            return res.status(400).json({ message: "Incorrect password." });
        }
        let token = _createToken(dbUser);
        return res.status(200).json({
            message: "Successful",
            user: _getUserInfo(dbUser),
            token: `Bearer ${token}`
        });
    } catch (err) {
        return res.status(500).json({ message: "Some error occurred." });
    }
};

const getUser = async (req, res) => {
    try {
        let dbUser = await User.findById(req.user.id);
        return res.status(200).json(_getUserInfo(dbUser));
    } catch (err) {
        return res.status(500).json({ message: "Some error occurred." });
    }
}

module.exports = {
    signup,
    login,
    getUser
};
