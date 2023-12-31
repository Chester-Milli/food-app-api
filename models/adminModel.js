const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const adminSchema = new Schema({

    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String
    },
    role:{
        type:String,
        required:true
    }


},{timestamps:true})

const Admin = mongoose.model("admin",adminSchema)

module.exports = Admin