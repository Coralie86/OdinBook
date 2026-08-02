const {Router} = require("express")
const postController = require("../controllers/postController.js")
const authController = require("../controllers/authController.js")
const postValidator = require("../controllers/validations/postValidation.js")

const postRouter = Router();

postRouter.post('/', postValidator.newPostValidator, authController.isAuthenticated, postController.createPost)
postRouter.get('/', authController.isAuthenticated, postController.getPost)
postRouter.delete('/:postId', authController.isAuthenticated, postController.deletePost)

postRouter.post('/:postId/likes', authController.isAuthenticated, postController.likePost)
postRouter.delete('/:postId/likes', authController.isAuthenticated, postController.unlikePost)

postRouter.post('/:postId/comments', postValidator.commentValidator, authController.isAuthenticated, postController.commentPost)

module.exports = postRouter