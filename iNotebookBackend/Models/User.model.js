var mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    cpassword:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
        default:Date.now
    },
})


module.exports = mongoose.model('UserData',UserSchema)