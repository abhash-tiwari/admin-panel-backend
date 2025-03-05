const express = require("express")

const router = express.Router()
const authControllers = require("../controllers/auth-controller")

// const signUpSchema = require('../validators/auth-validator')
const validator = require('../validators/auth-validator')
const validate = require('../middlewares/validate-middleware')

// router.get("/" , (req,res) => {
//     res.status(200).send("welcome using router")
//   })

router.route("/").get(authControllers.home);


router.route("/register").post(validate(validator.signUpSchema), authControllers.register)
router.route("/login").post(validate(validator.signInSchema),authControllers.login)



  module.exports = router;

