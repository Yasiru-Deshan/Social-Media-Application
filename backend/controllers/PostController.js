const User = require("../models/User");
const Post = require("../models/Post");

//create posts
const createPost = async(req,res,next)=>{
    try{
        const user = User.findById(req.user.id);

        const newPost = new Post({
            user: req.user.id,
            image: req.body.image,
            
        })

        await user.updateOne({
            $push: { posts: [newPost]},
        });
        await newPost.save();
        res.status(200).json("Post Created");
    }catch(err){
        res.status(500).json(err);
    }
}

//get posts
const getPosts = async(req,res,next) =>{
    try{
        const posts = await Post.find().populate('user');
       
        return res.status(200).json({msg:"Posts found", posts});
    }catch(err){
            return res.status(500).json({
              msg: err,
            });
    }
}

//like and dislike a post
const likePost = async(req,res,next)=>{
    try{
        const post = await Post.findById(req.params.id);

        if(!post.likes.includes(req.body.userId)){
            
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("Post has been liked");
        }else{
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("Post has been disliked");
        }
    }catch(err){
        res.status(500).json(err);
    }
    
}




exports.createPost = createPost;
exports.getPosts = getPosts;
exports.likePost = likePost;
