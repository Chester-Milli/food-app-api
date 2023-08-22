const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()
const jwtsecret = process.env.JWT


const createUser = async (request, response)=>{

    const {firstName,lastName,email,phoneNumber,password} = request.body

    try{

    if(!firstName){

        return response.status(422).json({status:"error", message:"First Name is Required"})
    }
    if(!lastName){

        return response.status(422).json({status:"error", message:"Last Name is Required"})
    }
    if(!email){

        return response.status(422).json({status:"error", message:"Email is Required"})
    }
    if(!phoneNumber){

        return response.status(422).json({status:"error", message:"Phone Number is Required"})
    }
    if(!password){

        return response.status(422).json({status:"error", message:"Password is Required"})
    }



    // SIngle Email
    const userExists = await User.findOne({email})

    if(userExists){

        return response.status(401).json({status:"error", message:"Email Already In Use"})
    }


    const hashedPassword = await bcrypt.hash(password,10)
    


    const user = await User.create({firstName,lastName,email,phoneNumber,password:hashedPassword})
    
    const token = jwt.sign({user},jwtsecret)

    user.token = token

    await user.save()

    response.cookie("token",token,{httpOnly:true})
    
    response.status(201).json({status:"success",user})


    }catch(error){

        console.log(error)
        response.status(500).json({status:"error",message:"Internal Server Error"})


    }

}


// login user
const loginUser = async (request, response)=>{

    const {email,password} = request.body

        try{


            if(!email){

                return response.status(422).json({status:"error", message:"Email Is Required"})
            }
            if(!password){

                return response.status(422).json({status:"error", message:"Password Is Required"})
            }

            const user = await User.findOne({email})

            if(!user){

                return response.status(401).json({status:"error", message:"Invalid Credentials"})


            }

            const passwordIsValid = await bcrypt.compare(password, user.password)


            if(!passwordIsValid){

                return response.status(401).json({status:"error", message:"Invalid Credentials"})

            }


            response.cookie("token",user.token,{httpOnly:true})

             response.status(200).json({status:"success", message:"Login Sucessful", user})



        }catch(error){

            console.log(error)
            response.status(500).json({status:'false', message:"Internal Server Error"})
        }

}



module.exports = {createUser,loginUser}