import mongoose from "mongoose";

const orderschema = new mongoose.Schema({
    uderid :{
        type : mongoose.Schema.ObjectId,
        ref :'user'
    },
    orderId : {
        type : String,
        required : [true ,"Provide orderId"],
        unique : true
    },
    productId:{
        type : mongoose.Schema.ObjectId,
        ref : "product"

    },
    product_detail:{
        name : String,
        Image : Array
    },
    paymentId :{
        type : String,
        default : ""
    },
    payment_status :{
        type : String,
        default : ""
    },
    dilivary_address :{
        type : mongoose.Schema.orderId,
        ref : 'address'
      },
      subtotalAmt : {
        type : Number,
        default : 0

      },
      totalAmt : {
        type : Number ,
        default : 0
      },
      invoice_receipt :{
        type : String ,
        default : ""
      }
},
{timestamp : true
})
const OrderModel = mongoose.model('order', orderschema)
export default OrderModel