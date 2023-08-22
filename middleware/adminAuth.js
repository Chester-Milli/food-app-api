const jwt = require("jsonwebtoken")
require("dotenv").config()
const jwtsecret = process.env.ADMIN_JWT



const checkAdmin = (request, response,next)=>{

    const token = request.cookies.token


    try{


    if(!token){

        return response.status(401).json({status:"error", message:"Unauthorized"})
    }



    try{

    const decoded = jwt.verify(token,jwtsecret)

    // console.log(decoded)

    request.role = decoded.admin.role

    // console.log(decoded.admin.role)

    next()


    }catch(error){

        response.status(401).json({status:"error", message:"Unauthorized"})
        console.log(error)
    }




    }catch(error){

        response.status(500).json({status:'error', message:"Internal Server Error"})
        console.log(error)
    }


    


}


module.exports = checkAdmin