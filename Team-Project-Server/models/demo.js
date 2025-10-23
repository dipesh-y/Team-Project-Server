import { verify } from "jsonwebtoken";
import mongoose from "mongoose";
const userShema = mongoose.Schema({
    name: {
        
        type : String,
        required : [true , "provide name"]
        
    },
    email :{
        type : String,
        required : " provide email"

    },
    password :{
        type : String,
        required : "provide password"
    },
    avatar : {
        type : String,
        default : "null"
    },
    mobile :{
        type : Boolean,
        default : false
    },
    verify_email : {
        type : Boolean,
        default : false
    },
    Lart_login : {
        type : Date,
        default : ""
    },
    status : {
        type : String,
        enum : ["active" , "inactive"],
        default : "active"
    },
    address_details :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Address"
    },
    Shooping_cart :{
        type : mongoose.Schema,ObjectId,
        ref : "cartproduct"
    },
    orderHistory :
    {
        type : mongoose.Schema.ObjectId,
        ref : "order"

    },
    forgot_password_otp :{
        type : String,
        default : null
    },
    forgot_password_expiry:{
        type : Date,
        default : ""
    },
    role : {
        type : String,
        enum : ["ADMIN" , "USER"],
        default : "USER"

    }, 
   
},{
    timestamps : true
}
)