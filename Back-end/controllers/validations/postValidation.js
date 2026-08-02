const {body} = require("express-validator")

const newPostValidator = [
    body("content").trim()
    .isLength({max: 1000}).withMessage("Content has a max of 1000 characters.")
    .custom( (value) =>{
        if (value === "<p><br></p>"){
            throw new Error("You need to insert a text.")
        } else {
            return true;
        }
    })
]

const commentValidator = [
    body("description").trim()
    .isLength({max: 300}).withMessage("Content has a max of 300 characters.")
    .notEmpty().withMessage("You need to write a comment.")
]

module.exports = {newPostValidator, commentValidator}