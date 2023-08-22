const express = require("express")
const router = express.Router()

const {createAdmin,loginAdmin} = require("../controllers/adminControllers")
// const checkAdmin = require("../middleware/adminAuth")




router.post("/admin/signup",createAdmin)
router.post("/admin/login",loginAdmin)

// router.get("/myadmin",checkAdmin)


module.exports = router