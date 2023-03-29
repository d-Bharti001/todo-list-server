const router = require("express").Router();
const jwt = require("../middlewares/jwt");
const user = require("../controllers/user");

router.post("/signup", user.signup);
router.post("/login", user.login);
router.get("/", jwt.verifyJwt, user.getUser);

module.exports = router;
