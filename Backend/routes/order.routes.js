import express from "express"
import { authRoles, isAuthUser } from "../middleware/auth.js"
import { deleteOrder, getAllOrders, getSingleOrder, myOrders, newOrder, updateOrder } from "../controllers/order.controllers.js"
const router = express.Router()

router.post("/order/new", isAuthUser, newOrder)

router.get("/order/:id", isAuthUser, getSingleOrder)

router.get("/orders/me", isAuthUser, myOrders)

router.get("/admin/orders", isAuthUser ,authRoles("admin"), getAllOrders)

router
.route("/admin/order/:id")
.put(isAuthUser, authRoles("admin"), updateOrder)
.delete(isAuthUser, authRoles("admin"), deleteOrder)
export default router