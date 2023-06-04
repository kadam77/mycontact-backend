const asyncHandler = require("express-async-handler");
const User =  require("../models/userModel");
const bycrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { use } = require("../routes/userRoutes");
const dotenv = require("dotenv").config();



//@desc register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const {username,email,password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("al fields are mandatory");
    }
    const userAvaliable = await User.findOne({email});
    if(userAvaliable){
        res.status(400);
        throw new Error("user already exists");
    }

//hash the password
const hashPassword = await bycrpt.hash(password,10);
console.log(hashPassword);

const user =  await User.create({
    username,
    email,
    password:hashPassword,

});
if(user){
    res.status(201).json({_id: user.id,email: user.email});

}else{
    res.status(400);    
    throw new Element("not a vaalid req")
}
res.json({message:"register the user"});
  
});



//@desc login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const{email,password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("aal fields are mandatory");
     }


    const user = await User.findOne({email});

   if(email && (await bycrpt.compare(password,user.password))){
        const  accessToken = jwt.sign({
            user:{
                username:user.username,
                email:user.email,   
                id: user.id
            }
        },process.env.ACCESS_TOKEN_SECRET,{expiresIn:"30m"})
        res.status(200).json({accessToken});
    }else{
      res.status(401);
      throw new Error("email or password is not valid")

    }
  });
  


//@desc current user
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
   });
   

module.exports = {
    currentUser,
    loginUser,
    registerUser 
}

