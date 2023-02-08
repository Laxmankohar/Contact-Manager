const express = require("express")
const { registerUser, loginUser, currentUser } = require("../controllers/userController")
const validateToken = require("../middleware/validateTokenHandler")
const router = express.Router()

// Register new user
router.post("/register", registerUser);


// login
router.post("/login",loginUser );

// Current user infromation
router.get("/current", validateToken, currentUser );


module.exports = router;