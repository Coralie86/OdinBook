const jwt = require("jsonwebtoken")
const db = require("../services/queries.js")
const auth = require("../services/authServices.js")
const bcrypt = require("bcryptjs")
const {validationResult} = require("express-validator")
const sanitizeHTML = require("../utils/sanitizeHTML.js");

exports.wakeUpServer = async (req, res, next) => {
    return res.status(200).json({status: "ok"})
}

exports.register = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const newUser = req.body;

    const newUserCLeaned = {
        username: sanitizeHTML(newUser.username),
        email: sanitizeHTML(newUser.email),
        password: sanitizeHTML(newUser.password),
    }

    if(!newUserCLeaned.username || !newUserCLeaned.email || !newUserCLeaned.password){
        return res.status(400).json({errors: [{msg: "Insert a username, an email and a password."}]})
    }

    try {
        const newAccount = await db.createAccount(newUserCLeaned);
        return res.status(201).json(newAccount)
    } catch(err){
        next(err);
    }
}

exports.login = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const userLogged = req.body;

    if(!userLogged.email || !userLogged.password ){
        return res.status(400).json({errors: [{msg: "Insert an email and a password."}]})
    }
    
    try {
        const user = await auth.checkUserExists(userLogged);
        if(!user){
            return res.status(401).json({errors: [{msg: "No existing account for this email."}]})
        }

        const match = await bcrypt.compare(userLogged.password, user.password);
        if(!match){
            return res.status(401).json({errors: [{msg: "Wrong password."}]})
        }

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

exports.loginGuest = async (req, res, next) => {
    const guestLogged = {
        email: process.env.EMAIL_GUEST,
        password: process.env.PASSWORD_GUEST,
    }

    try {
        const user = await auth.checkUserExists(guestLogged);
        if(!user){
            return res.status(401).json({errors: [{msg: "No existing account for this email."}]})
        }

        const match = await bcrypt.compare(guestLogged.password, user.password);
        if(!match){
            return res.status(401).json({errors: [{msg: "Wrong password."}]})
        }

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