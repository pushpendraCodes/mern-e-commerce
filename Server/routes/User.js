const express = require("express");
const { fetchUserByUserId, UpdateUser } = require("../controllers/User");

const router = express.Router();


router
.get("/:id" ,fetchUserByUserId)
       .patch("/:id" ,UpdateUser)



exports.router = router