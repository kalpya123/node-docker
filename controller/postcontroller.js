const Post = require("../models/postModel");

exports.getAllPosts=async(req,res,next)=>{
    
    try {
        const post = await Post.find();
        res.status(200).json({
            status:'succes',
            results:post.length,
            data:{
                post,
            }
        })        
    } catch (error) {
        res.status(400).json({
            status:'fail',
            error:error
        })
    }

}

exports.getOnePost=async(req,res,next)=>{
     
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json({
            status:'succes',
            data:{
                post
            }
        })        
    } catch (error) {
        res.status(400).json({
            status:'fail',
            error:error
        })
    }
}




exports.CreatePost=async(req,res,next)=>{
     
    try {
        const post = await Post.create(req.body);
        res.status(200).json({
            status:'succes',
            data:{
                post
            }
        })        
    } catch (error) {
        res.status(400).json({
            status:'fail',
            error:error
        })
    }
}



exports.UpdatePost=async(req,res,next)=>{
     
    try {
        const post = await Post.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        });
        res.status(200).json({
            status:'succes',
            data:{
                post
            }
        })        
    } catch (error) {
        res.status(400).json({
            status:'fail',
            error:error
        })
    }
}



exports.deletePost=async(req,res,next)=>{
     
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status:'succes',
        })        
    } catch (error) {
        res.status(400).json({
            status:'fail',
            error:error
        })
    }
}