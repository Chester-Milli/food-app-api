const express = require("express")
const router = express.Router()
const {createUser,loginUser} = require("../controllers/userControllers")

router.post("/users/signup",createUser)
router.post("/users/login",loginUser)



module.exports = router