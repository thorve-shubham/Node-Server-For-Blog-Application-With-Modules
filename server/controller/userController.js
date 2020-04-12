const mongoose = require('mongoose');
const { User } = require('../model/user');
const bcryptLib = require('../lib/bcryptLib');
const { generateResponse } = require('../lib/responseLib');
const isEmpty = require('../lib/checkLib');

async function createUser(req,res){

    const olduser = await User.find({email:req.body.email}).select('-_id-__v');
    
    if(!isEmpty(olduser)){
        return res.send(generateResponse(403,true,"User Already Exists",null));
    }

    req.body.password = await bcryptLib.generateHashedPassword(req.body.password);

    const user = new User({
        userId : req.body.userId,
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    });

    await user.save();

    return res.send(generateResponse(200,null,"User Created Successfully",user));
}

async function login(req,res){

    const user = await User.findOne({email:req.body.email}).select('-_id-__v');
    console.log(req.body.email);
    console.log(user);
    if(isEmpty(user)){
        console.log("1");
        return res.send(generateResponse(403,true,"Invalid Email or Password",null));
    }else if(!bcryptLib.isPasswordRight(req.body.password,user.password)){
        console.log("2");
        return res.send(generateResponse(403,true,"Invalid Email or Password",null));
    }else{
        console.log("3");
        const token = user.generateAuthToken();
        return res.header('x-authToken',token).send(generateResponse(200,null,"Login Successful",token));
    }

}

module.exports.createUser = createUser;
module.exports.login = login;