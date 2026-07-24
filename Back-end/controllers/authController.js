const jwt = require("jsonwebtoken")
const db = require("../services/queries.js")
const auth = require("../services/authServices.js")

exports.register = async (req, res, next) => {

    const newUser = req.body;

    if(!newUser.username || !newUser.email || !newUser.password){
        return res.status(400).json({message: "Insert a username, an email and a password."})
    }

    try {
        const newAccount = await db.createAccount(newUser);
        return res.status(201).json(newAccount)
    } catch(err){
        next(err);
    }
}

exports.login = async (req, res, next) => {

    const user = req.body;

    if(!user.email || !user.password ){
        return res.status(400).json({message: "Insert an email and a password."})
    }
    
    try {
        const { access_token, refresh_token } = await auth.loginUser(user);
        res.cookie('refreshToken', refresh_token, {
            httpOnly: true,
            maxAge: 24*60*60*1000,
        })

        res.status(200).json({message: 'Authentication sucessfull.', accessToken: access_token})
    } catch(err) {
        next(err)
    }
}

exports.logout = async (req, res, next) => {    
    try {        
        res.clearCookie("refreshToken")
        res.status(200).json({message: 'Logout sucessfull.'})
    } catch(err) {
        next(err)
    }
}

exports.refreshToken = (req, res, next) => {
    const refresh_token = req.cookies.refreshToken;
    if(!refresh_token){
        return res.status(401).json({message: "Not logged in or refresh token expired."})
    }
    try {
        const access_token_refreshed = auth.refreshToken(refresh_token);
        res.status(200).json({message: 'Token refreshed.', accessToken: access_token_refreshed})
    } catch(err) {
        next(err)
    }
}

exports.isAuthenticated = async (req, res, next) => {
    const authHeaders = req.headers["authorization"];
    if(!authHeaders){
        return res.status(401).json({message: "User not Authenticated."})
    }

    const token_access = authHeaders.split(' ')[1];
    if(!token_access){
        return res.status(401).json({message: "Token not well formed."})
    }

    // console.log(token_access)
    // console.log("now:", Math.floor(Date.now() / 1000));
    // console.log(jwt.decode(token_access))

    try {
        const decoded = auth.verifyToken(token_access, process.env.JWT_SECRET_ACCESS)
        req.user = decoded;
        next();
    } catch (err) {
        next(err)
    }
}