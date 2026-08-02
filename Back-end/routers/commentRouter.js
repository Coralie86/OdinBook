const {Router} = require("express");
const commentController = require("../controllers/commentController.js")
const authController = require("../controllers/authController.js")
const postValidator = require("../controllers/validations/postValidation.js")

const commentRouter = Router()

commentRouter.put('/:commentId', postValidator.commentValidator, authController.isAuthenticated, commentController.editComment)
commentRouter.delete('/:commentId', authController.isAuthenticated, commentController.deleteComment)

module.exports = commentRouter;