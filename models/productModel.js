//Product Model
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const ProductSchema = new Schema({

    productName:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }

},{timestamps:true})

const Product = mongoose.model("product",ProductSchema)

module.exports = Product
