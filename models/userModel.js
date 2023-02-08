const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true, "Please enter your name"],
    },
    email:{
        type:String,
        required:[true, "Please enter your email address"],
        unique:[true, "Email address already taken"]
    }, 
    password:{
        type:String,
        required:[true, "Please enter your password."]
    }
},

{
    timestamps:true,
})


module.exports = mongoose.model("Users", userSchema)