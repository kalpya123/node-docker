const User = require("../models/userModel");
var bcrypt = require('bcryptjs');


exports.Signup=async(req,res,next)=>{
try {
    const username=req.body.username;
    const password=req.body.password;
  const hashpassword=await bcrypt.hash(password,12);
  const user=await User.create({username,password:hashpassword});
  req.session.user= user;
  res.status(200).json({
      status:"sucess",
      data:{
          user:user
      }
  })
} catch (error) {
    res.status(400).json({
        status:'fail',
        error:error
    })
}
}

exports.login=async(req,res)=>{
    try {
        const {username,password}=req.body;
        const user= await User.findOne({username});
        if(!user)
        {
         return  res.status(400).json({
                status:'fail',
                message:'user not found'
            })
        }
        else{
       const isCorrect=await bcrypt.compare(password,user.password)
       console.log(isCorrect);
       if(isCorrect)
       {
           req.session.user= user;
        res.status(200).json({
            status:'sucess',

        })
       }
       else{
        res.status(400).json({
            status:'fail',
            message:'incorrect password'
        })
       }
        }

    } catch (error) {
        res.status(400).json({
            status:'fail',
            error:error
        })  
    }
}