const express = require("express")
const mongoose = require("mongoose")
const app = express()
const morgan = require("morgan")
require("dotenv").config()
const cookieParser = require("cookie-parser")




// routes

const userRoutes = require("./routes/userRoutes")
const adminRoutes = require("./routes/adminRoutes")
const productRoutes = require("./routes/productRoutes")



const mongoDBURI = process.env.URI


mongoose.connect(mongoDBURI,{useUnifiedTopology:true, useNewUrlParser:true})
.then(()=>{
    console.log("Connected To MongoDB")
})
.catch((error)=>{

    console.log(`Unable to Connected to Database ${error}`)
})


app.listen(3000,()=>{

    console.log("Server Started at Port 3000")
})






// Set Middlewares
app.use(morgan("dev"))
app.use(express.json({limit:"10mb"}))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())



// use routes

app.use(userRoutes)
app.use(adminRoutes)
app.use(productRoutes)

