const express = require("express");
const { createOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder, updateOrderToPaid} = require("../controllers/order.controller");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


router.route("/order/new").post(isAuthenticatedUser, createOrder);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder).delete(isAuthenticatedUser, deleteOrder);

router.route("/order/:id/pay").put(isAuthenticatedUser, updateOrderToPaid);

router.route("/orders/me").get(isAuthenticatedUser, myOrders);

router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

router
    .route("/admin/order/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)



module.exports = router;