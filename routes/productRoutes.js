const express = require("express")
const router = express.Router()

const {createProduct,getProduct,editProduct,deleteProduct,getAllProducts} = require("../controllers/productControllers")
const checkAdmin = require("../middleware/adminAuth")


router.post("/product/get",getProduct)
router.post("/product/get/all",getAllProducts)
router.post("/product/new",checkAdmin,createProduct)
router.post("/product/edit",checkAdmin,editProduct)
router.post("/product/delete",checkAdmin,deleteProduct)



module.exports = router