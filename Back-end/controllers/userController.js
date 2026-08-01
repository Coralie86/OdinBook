const db = require("../services/queries.js")

exports.getUsers = async (req,res,next) => {
    const userId = parseInt(req.user.id);
    const filters = req.query;
    
    try {
        const usersList = await db.getUsers(userId, filters)
        return res.status(200).json(usersList)
    } catch(err) {
        next(err)
    }
}

exports.requestFollowUser = async (req,res,next) => {
    const userId = parseInt(req.user.id);
    const userFollowedId = parseInt(req.params.userId);

    if(!userFollowedId){
        return res.status(400).json({message: "Not user selected."})
    }

    try {
        await db.followUser(userId, userFollowedId);
        res.status(200).json({message: "Request sent."})
    } catch(err) {
        next(err)
    }
}

exports.acceptFollowUser = async (req,res,next) => {
    const userId = parseInt(req.user.id);
    const userFollowedId = parseInt(req.params.userId);

    if(!userFollowedId){
        return res.status(400).json({message: "Not user selected."})
    }

    try {
        const followUpdated = await db.acceptFollow(userFollowedId, userId);
        res.status(200).json({message: "Follow has been accepted", follow: followUpdated})
    } catch(err) {
        next(err)
    }
}

exports.unfollowUser = async (req,res,next) => {
    const userId = parseInt(req.user.id);
    const userFollowedId = parseInt(req.params.userId);

    if(!userFollowedId){
        return res.status(400).json({message: "Not user selected."})
    }

    try {
        await db.unfollow(userId, userFollowedId);
        res.status(200).json({message: "Follow has been deleted"})
    } catch(err) {
        next(err)
    }

}

exports.getMyProfil = async (req,res,next) => {
    try{
        const user = {
            id: req.user.id,
            email: req.user.email,
            image: req.user.image,
            username: req.user.username,
        };
        res.status(200).json(user)
    } catch(err) {
        next(err)
    }
}

exports.updateMyProfil = async (req,res,next) => {
    const newUser = req.body;
    const userId = parseInt(req.user.id);

    try {
        await db.updateProfile(userId, newUser);
        res.status(200).json({message: "Profile successfully updated."});
    } catch(err){
        next(err)
    }
}

exports.updatePassword = async (req,res,next) => {
    const userId = parseInt(req.user.id);
    const newPassword = req.body.password;

    if(!newPassword) {
        return res.status(400).json({message: "Insert a password"})
    }

    try {
        await db.updatePassword(userId, newPassword)
        return res.status(200).json({message: "Password successfully updated."})
    } catch(err){
        next(err)
    }

}