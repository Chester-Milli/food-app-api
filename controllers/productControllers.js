const Product = require("../models/productModel")



const createProduct = async (request, response)=>{

    const {productName,price,image,description,quantity} = request.body


    try{

        if(!productName){

            return response.status(422).json({status:"error", message:"Product Name is Required"})
        }
        if(!price){

            return response.status(422).json({status:"error", message:"Product Price is Required"})
        }
        if(!image){

            return response.status(422).json({status:"error", message:"Product Image is Required"})
        }
        if(!description){

            return response.status(422).json({status:"error", message:"Product Description is Required"})
        }
        if(!quantity){

            return response.status(422).json({status:"error", message:"Product quantity is Required"})
        }


        const product = await Product.create({productName,price,image,description,quantity})

        response.status(201).json({status:"success", message:"Product Created"})

    }catch(error){

        response.status(500).json({status:"error", message:"Internal Server Error"})
        console.log(error)
    }

}


/**
 * Get all Products
 */
const getAllProducts = async (request, response)=>{

    const products = await Product.find().sort({createdAt:-1}) ///Newest item(s) updates at the beginning

    response.status(200).json({status:"success",products})
}



/**
 * Get Product By Unique ID
 */
const getProduct = async (request, response)=>{

    const id = request.query.id


    try{



    if(!id){

        return response.status(404).json({status:"error",message:"Product Id Not Found"})
    }

    const product = await Product.findById(id)

    if(!product){

        return response.status(404).json({status:"error", message:"Product Not Found"})
    }


    response.status(200).json({status:"success",product})

    


}catch(error){

    response.status(500).json({status:"error", message:"Internal Server Error"})
    console.log(error)
}



}


/**
 * Edit Product By Unique ID (superadmin)
 */
const editProduct = async (request, response)=>{

    const {productName,price,image,description,quantity}= request.body
    const id =  request.query.id

    try{

        if(!id){

            return response.status(404).json({status:"error",message:"Product Id Not Found"})
        }

        if(!productName){

            return response.status(422).json({status:"error", message:"Product Name is Required"})
        }
        if(!price){

            return response.status(422).json({status:"error", message:"Product Price is Required"})
        }
        if(!image){

            return response.status(422).json({status:"error", message:"Product Image is Required"})
        }
        if(!description){

            return response.status(422).json({status:"error", message:"Product Description is Required"})
        }
        if(!quantity){

            return response.status(422).json({status:"error", message:"Product quantity is Required"})
        }

        const product =  await Product.findByIdAndUpdate(id,{productName,price,image,description,quantity})

        await product.save()


        response.status(200).json({status:"success", message:"Product Updated Successfully"})


    }catch(error){

        response.status(500).json({status:"error", message:"Internal Server Error"})
        console.log(error)
    }

}

/**
 * Delete Product By Unique ID (superadmin)
 */
const deleteProduct = async (request, response)=>{

    const id = request.query.id


    try{

        if(!id){

            return response.status(404).json({status:"error",message:"Product Id Not Found"})
        }

        await Product.findByIdAndDelete(id)

        response.status(200).json({status:"success", message:"Product Deleted Successfully"})


    }catch(error){

        response.status(500).json({status:"error", message:"Internal Server Error"})
        console.log(error)
    }

}


module.exports = {createProduct,getProduct,editProduct,deleteProduct,getAllProducts}