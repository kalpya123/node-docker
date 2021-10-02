const express= require("express");
const usercontroller = require("../controller/userController");
const router=express.Router();

router.post("/signup",usercontroller.Signup);

router.post("/login",usercontroller.login);
module.exports=router;