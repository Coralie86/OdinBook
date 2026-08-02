const {Router} = require("express")
const userController = require("../controllers/userController.js")
const authController = require("../controllers/authController.js")
const userValidator = require("../controllers/validations/settingsValidation.js")

const userRouter = Router();

userRouter.get('/', authController.isAuthenticated, userController.getUsers)

userRouter.get('/me', authController.isAuthenticated, userController.getMyProfil)
userRouter.put('/me', userValidator.infoValidator, authController.isAuthenticated, userController.updateMyProfil)
userRouter.put('/me/password', userValidator.passwordValidator, authController.isAuthenticated, userController.updatePassword)

userRouter.post('/:userId/follows', authController.isAuthenticated, userController.requestFollowUser)
userRouter.put('/:userId/follows', authController.isAuthenticated, userController.acceptFollowUser)
userRouter.delete('/:userId/follows', authController.isAuthenticated, userController.unfollowUser)


module.exports = userRouter