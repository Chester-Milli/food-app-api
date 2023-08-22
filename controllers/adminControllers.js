const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken")
require("dotenv").config()
const jwtsecret = process.env.ADMIN_JWT
const bcrypt = require("bcrypt")

const createAdmin = async (request, response)=>{

    const {email,password} = request.body

    try{

    
    if(!email){

        return response.status(422).json({status:"error", message:"Email is Missing"})
    }

    if(!password){

        return response.status(422).json({status:"error", message:"Email is Missing"})
    }

    const adminExists = await Admin.findOne({role:"admin"})

    if(adminExists){

        return response.status(401).json({status:"error", message:"Unauthorized Request! There is Already an Admin"})
    }


    const hashedPassword = await bcrypt.hash(password,10)


    //Creating admin
    const admin = await Admin.create({email,password:hashedPassword, role:"admin"})

    const token = jwt.sign({admin},jwtsecret)

    admin.token = token

    await admin.save()


    response.status(201).json({status:"success",message:"Admin Created Sucessfully", admin})


    }catch(error){

        response.status(500).json({status:"error", message:"Internal Server Error"})
        console.log(error)
    }





}

const loginAdmin = async (request, response)=>{

    const {email,password} = request.body

    try{

        if(!email){

            return response.status(422).json({status:"error", message:"Email is Missing"})
        }
    
        if(!password){
    
            return response.status(422).json({status:"error", message:"Email is Missing"})
        }

        const admin = await Admin.findOne({email})

        if(!admin){

            return response.status(401).json({status:"error", message:"Invalid Credentials"})

        }

        const passwordIsValid = await bcrypt.compare(password, admin.password)


        if(!passwordIsValid){

            return response.status(401).json({status:"error", message:"Invalid Credentials"})
        }


        response.cookie("token",admin.token,{httpOnly:true})

        response.status(200).json({status:"success", admin})


    }catch(error){

        response.status(500).json({status:"error", message:"Internal Server Error"})
        console.log(error)
    }


}




module.exports = {createAdmin,loginAdmin}