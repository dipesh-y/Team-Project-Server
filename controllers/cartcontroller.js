import { request, response } from "express";
import CartProductModel from "../models/cartproductmodel.js"; 
import UserModel from "../models/usermodel.js";
// import { useReducer } from "react";


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

export const getCartItemController = async (request,response)=>{
    try{
        const userId = request.userId;

        const cartItem= await CartProductModel.find({
            userId : userId
        }).populate('productId')


        return response.json({
            data: cartItem,
            error : false,
            success : true
        })
        
    } catch(error){
        return response.status(500).json({
            message:error.message || error,
            error : true,
            success : false
        })
    }
}

export const updateCartQtyController = async(request,response)=>{
    try {
        const userId = request.userId;
        const {_id,qty}= request.body;

        if(!_id || !qty){
            return response.status(400).json({
                message : "provide_id, qty"
            })
        }
       
        const updateCartitem = await CartProductModel.updateOne(
            {
            _id : Id,
            userId : userId
        },
        {
            quantity : qty
        })
        
        return response.json({
            message : "Update cart",
            success : true,
            error : false,
            data : updateCartitem
        })


    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success: false
        })
        
    }
}


export const deleteCartItemQtyController = async ( request,response)=>{
    try {
        const userId = request.userId  // middleware
        const {_id, productId} = request.body;


        if(!_id){
            return response.status(400).json({
                message : "Provide _id",
                error: true,
                success : false
            })
        }

        const deleteCartItem = await CartProductModel.deleteOne({_id : _id,userId : userId})

        if(!deleteCartItem){
            return response.status(900).json({
                message: "The Product in the cart is not found",
                error: true,
                success: false
            })
        }

        const user = await UserModel.findOne({
            _id : userId
        })


        const cartItem = user?.shopping_cart;

        const updatedUserCart = [...cartItem.slice(0,cartItem.indexOf(productId)),...cartItem.slice(cartItem.indexOf(productId)+1)];

        user.shopping_cart = updatedUserCart;

        await user.save();


        return response.json({
            message : "Item remove",
            error : false,
            success : true,
            data : deleteCartItem
        })

        
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error : true,
            success : false
        })
        
    }
}
