import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    product_id:{
        required:true,
        type:String,
        trim:true,
        unique:true
    },
    title:{
        required:true,
        type:String,
        trim:true
    },
    price:{
        required:true,
        type:Number,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    contents:{
        type:String,
        required:true,
        trim:true
    },
    images:{
        type:Object,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    checked:{
        type:Boolean,
        default:false,
    },
    sold:{
        type:Number,
        default:0
    }
},{
    timestamps:true
})

export default mongoose.model("Product",productSchema)