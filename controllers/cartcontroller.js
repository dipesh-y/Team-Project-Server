import { request, response } from "express";
import CartProductModel from "../models/cartproductmodel.js"; 
import UserModel from "../models/usermodel.js";


export const addToCartItemController= async (request,response)=>{
    try{
        const userId=request.userId;
        const {productId} = request.body;
        if(!productId){
            return response.status(402).json({
                message: "Provide productId",
                error:true,
                success: false
            })
        }

        const checkItemCart = await CartProductModel.findOne({
            userId:userId,
            productId:productId
        })

        if(checkItemCart){
            return response.status(400).json({
                message:"Item already in cart"
            })
        }

        const cartItem = new CartProductModel({
            quantity: 1,
            userId:userId,
            productId:productId
        })

        const save = await cartItem.save();// saved cartItem in cart Table 


        const updateCartUser = await UserModel.updateOne({_id : userId},{
            $push : {
                shopping_cart : productId
            }
        })


        return response.status(200).json({
            date : save,
            message : "Item add successfully",
            error : false ,
            success : true
        })



    } catch(error){
        return response.status(500).json({
            message:error.message || error,
            error : true,
        })
    }
}