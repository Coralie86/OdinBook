const {body} = require("express-validator")

const infoValidator = [
    body("username").trim()
    .isLength({min: 3}).withMessage("Username should contain at least 3 characters."),
    body("email").trim()
    .isEmail().withMessage("Email is not an email."),
]

const passwordValidator = [
    body("password").trim()
    .isLength({min: 8}).withMessage("Password must contain at least 8 characters")
    .matches(/[A-Z]/).withMessage("Password must contain at least a capital letter.")
    .matches(/\d/).withMessage("Password must contain at least a number.")
    .matches(/[^A-Za-z0-9]/).withMessage("Password must contain at least a special character."),
    body('passwordConfirmation').trim()
    .custom( (value, {req}) =>{
        if (value != req.body.password){
            throw new Error("Confirmation Password must be equal to Password.")
        } else {
            return true;
        }
    })
]

module.exports = {infoValidator, passwordValidator}