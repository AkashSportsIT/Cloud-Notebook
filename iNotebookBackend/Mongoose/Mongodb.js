var mongoose = require('mongoose');
// const MONGO_URL = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false'



// console.log(process.env.MONGO_URL)

exports.connectDb = (MONGO_URL) =>{
    mongoose.connect(MONGO_URL,()=>{
        console.log("Database Connected...!!")
    })
}



