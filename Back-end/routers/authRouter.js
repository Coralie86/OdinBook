const {Router} = require("express")
const authController = require("../controllers/authController")
const authValidator = require("../controllers/validations/authValidation.js")

const authRouter = Router();

authRouter.post('/register', authValidator.registerValidator, authController.register)
authRouter.post('/login', authValidator.loginValidator, authController.login)
authRouter.post('/logout', authController.logout)
authRouter.post('/refresh-token', authController.refreshToken)

module.exports = authRouter