
const express = require("express")
const { CreateOrder,updateOrder,fetchOrdersByUser,deleteOrder, fetchAllOrders } = require("../controllers/Order")


const router = express.Router()

router.post("/" ,CreateOrder)
.patch("/:id" ,updateOrder)
.delete("/:id" ,deleteOrder)
.post("/user" ,fetchOrdersByUser)

.get("/" ,fetchAllOrders)





exports.router = router