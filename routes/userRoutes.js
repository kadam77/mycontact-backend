const express = require("express");
const {currentUser,
    loginUser,
    registerUser } = require('../controllers/usercontrollers');
const vaildateToken = require("../middleware/validationTokenHandler");

const router = express.Router();

router.post("/register",registerUser);


router.post("/login",loginUser);


router.get("/current",vaildateToken,currentUser);


module.exports = router;