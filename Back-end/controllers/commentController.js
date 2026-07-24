const db = require("../services/queries.js")

exports.editComment = async (req,res,next) => {
    const commentId = parseInt(req.params.commentId);
    const content = req.body.description;

    if(!content){
        return res.status(400).json({message: "Insert a comment."})
    }

    if(!commentId){
        return res.status(404).json({message: "Resource not found."})
    }

    try {
        const newComment = await db.editComment(content, commentId);
        return res.status(200).json({message: "Commetn successfully edited.", comment: newComment})
    } catch(err) {
        next(err)
    }

}

exports.deleteComment = async (req, res, next) => {
    const commentId = parseInt(req.params.commentId);

    if(!commentId){
        return res.status(404).json({message: "Resource not found."})
    }

    try {
        await db.deleteComment(commentId);
        return res.status(200).json({message: "Comment sucessfully deleted."})
    } catch(err) {
        next(err)
    }
}