
const express = require("express")
const { CreateUser ,loginUser,resetPasswordRequest,resetPassword } = require("../controllers/Auth")

const router = express.Router()

router.
    post("/" ,CreateUser)
    .post("/login" ,loginUser)
    .post('/resetPasswordRequest', resetPasswordRequest)
.post('/reset-password', resetPassword)



exports.router = router