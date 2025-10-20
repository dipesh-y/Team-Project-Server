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
    

    })