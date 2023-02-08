const asyncHandler = require("express-async-handler")
const brcypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel");
// const { use } = require("../routes/contactRoutes");

// @desc Register new user
// @route post/api/users
// @acess public

const registerUser = asyncHandler(async (req, res) =>{

    const {username, email, password} = req.body;

    // if everything is empty, in that case throw an error
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory")
    }

    const userAvailable = await User.findOne({email})  //finding  already registered email

    // if email is already registered throw an error
    if(userAvailable){
        res.status(400);
        throw new Error("Email already registered")
    }

    // new user
    // create hash password using bcrypt lib

    const hashpassword = await brcypt.hash(password,10)
    console.log("Tha hashed password: ",hashpassword);

    const user = await User.create({
        username,
        email,
        password:hashpassword
    })

    console.log(`User created ${user}`);

    if(user){
        res.status(201).json({_id:user.id, email:user.email});

    }
    else{
        res.status(400);
        throw new Error("Usre data is not valid")
    }



    res.status(200).json({message:"Register new user"})
});


// @desc login user
// @route post/api/users
// @acess public
const loginUser = asyncHandler(async (req, res) =>{
    const { email, password} = req.body;

    if(!password || !email){
        res.status(400);
        throw new Error("All fields are mandatory")
    }

    const user = await User.findOne({email});

    if(user && (await brcypt.compare(password, user.password))){ 
        const  accessToken = jwt.sign({
            // payload
            user:{
                username:user.username,
                email:user.email,
                id:user.id
            }
        }, process.env.ACCESS_TOKEN_SECRET, {expiresIn:"15m"})
        res.status(200).json({accessToken})
    }
    else{
        res.status(401);
        throw new Error("email or password is not valid");
    }

    // res.status(200).json({Message:"Login user"})
});


// @desc current user infromation
// @route get/api/users
// @acess private
const currentUser = asyncHandler(async (req, res) =>{
    res.json(req.user)
});





  module.exports = {registerUser, loginUser, currentUser}