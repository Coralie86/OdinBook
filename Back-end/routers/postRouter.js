const {Router} = require("express")
const postController = require("../controllers/postController.js")
const authController = require("../controllers/authController.js")

const postRouter = Router();

postRouter.post('/', authController.isAuthenticated, postController.createPost)
postRouter.get('/', authController.isAuthenticated, postController.getPost)
postRouter.delete('/:postId', authController.isAuthenticated, postController.deletePost)

postRouter.post('/:postId/likes', authController.isAuthenticated, postController.likePost)
postRouter.delete('/:postId/likes', authController.isAuthenticated, postController.unlikePost)

postRouter.post('/:postId/comments', authController.isAuthenticated, postController.commentPost)

module.exports = postRouter