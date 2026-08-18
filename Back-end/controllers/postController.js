const db = require("../services/queries.js")
const {validationResult} = require("express-validator")
const sanitizeHTML = require("../utils/sanitizeHTML.js");

exports.createPost = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    
    const postContent = req.body.content;

    const postContentCleaned = sanitizeHTML(postContent)

    if(!postContentCleaned){
        return res.status(400).json({errors: [{msg: "Insert a content."}]});
    }

    try {
        const newPost = await db.createPost(postContentCleaned, req.user.id);
        return res.status(201).json(newPost);
    } catch(err){
        next(err);
    }
}

exports.getPost = async (req,res,next) => {
    const userId = parseInt(req.user.id);
    const filters = req.query;
    
    try {
        const postList = await db.getAllPost(userId, filters)
        
        return res.status(200).json({postList: postList})
    } catch(err){
        next(err)
    }
}

exports.likePost = async (req,res,next) => {
    const postId = parseInt(req.params.postId)
    const userId = parseInt(req.user.id)

    if(!postId){
        return res.status(404).json({message: "Resource not found."})
    }
    
    try {
        const postLiked = await db.likePost(postId, userId);
        return res.status(200).json(postLiked);
    } catch(err) {
        next(err);
    }
}


exports.unlikePost = async (req,res,next) => {
    const postId = parseInt(req.params.postId)
    const userId = parseInt(req.user.id)

    if(!postId){
        return res.status(404).json({message: "Resource not found."})
    }
    
    try {
        await db.unlikePost(postId, userId);
        return res.status(200).json({message: "Post successfully unliked."});
    } catch(err) {
        next(err);
    }
}

exports.deletePost = async (req,res,next) => {
    const postId = parseInt(req.params.postId);

    if(!postId){
        return res.status(404).json({message: "Resource not found."})
    }

    try {
        await db.deletePost(postId);
        return res.status(200).json({message: "Post sucessfully deleted."})
    } catch(err) {
        next(err)
    }
}

exports.commentPost = async (req,res,next) => {
    const errors = validationResult(req); 

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const postId = parseInt(req.params.postId);
    const userId = parseInt(req.user.id);
    const content = sanitizeHTML(req.body.description);


    if(!postId){
        return res.status(404).json({errors: [{msg: "Resource not found."}]})
    }

    if(!content){
        return res.status(400).json({errors: [{msg: "Insert a comment."}]})
    }

    try {
        const newComment = await db.createComment(postId, userId, content);
        return res.status(200).json({message: "Comment sucessfully created.", comment: newComment})
    } catch(err) {
        next(err)
    }
}