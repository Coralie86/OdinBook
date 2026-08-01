const jwt = require("jsonwebtoken");
const {prisma} = require("../lib/prisma.js")

const generateToken = (payload, secret, expiresIn) => {
    return jwt.sign(payload, secret, {expiresIn})
}

const verifyToken = (token, secret) =>{
    return jwt.verify(token, secret)
}

const checkUserExists = async (payload) => {
    const user = await prisma.user.findUnique({
        where: {
            email: payload.email,
        },
    })
    return user;
}

const loginUser = async (payload) => {
    const user = await prisma.user.findUnique({
        where: {
            email: payload.email,
        },
        select: {
            email: true,
            id: true,
            image:true,
            username: true,
        }
    })
    const access_token = generateToken(user, process.env.JWT_SECRET_ACCESS, process.env.JWT_EXPIRESIN_ACCESS);
    const refresh_token = generateToken(user, process.env.JWT_SECRET_REFRESH, process.env.JWT_EXPIRESIN_REFRESH);

    return {
        access_token, refresh_token
    }
}

const refreshToken = (refreshToken) => {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH);

    const access_token_refreshed = generateToken({email: decoded.email, id: decoded.id, image: decoded.image}, 
        process.env.JWT_SECRET_ACCESS, process.env.JWT_EXPIRESIN_ACCESS);

    return access_token_refreshed
}

module.exports = {loginUser, refreshToken, verifyToken, checkUserExists}