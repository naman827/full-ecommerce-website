import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        reqired:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:Number,
        default:0
    },
    cart:{
        type:Array,
        default:[]
    }
},{
    timestamps:true
}
)

export default mongoose.model("Users",userSchema)