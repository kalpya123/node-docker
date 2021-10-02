const express= require("express");
const postcontroller = require("../controller/postcontroller");
const protect=require("../middleware/authMiddleware");
const router=express.Router();

router.get("/",protect,postcontroller.getAllPosts);
router.post("/add",protect,postcontroller.CreatePost);
router.get("/:id",protect,postcontroller.getOnePost);
router.patch("/update/:id",protect,postcontroller.UpdatePost);
router.delete("/delete/:id",protect,postcontroller.deletePost);


module.exports=router;