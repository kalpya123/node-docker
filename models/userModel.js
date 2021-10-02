const mongoose= require("mongoose");

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        require:[true,"user must have a username"],
        unique:true
    },
    password:{
       type:String,
       require:[true,"user Must have password"]
    }
})

const user=mongoose.model("User",userSchema);

module.exports=user;
