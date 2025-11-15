import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    name:{
        type : String,
        required : true,
        trim : true
    },
    Image:{
        type : String,

    },
    parentCatname:{
        type : String,

    },
    parenId:{
        type : mogoose.Schema.objectId,
        default :null,
        ref : 'category'
    }

},{timestamps : true})

const CategoryModel = mongoose .model ('category' , categorySchema)
export default CategorySchema;