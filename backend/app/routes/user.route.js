const express = require("express");
const { registerUser, loginUser, logout,  getUserDetails, getUser,
        updateProfile, updatePassword, getAllUser, getSingleUser, updateUserRole, deleteUser, verifyOTP, generateOTP, resetPassword, createResetSession
        } = require("../controllers/user.controller");
const {registerMail} = require("../controllers/sendEmail")
const {isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/user").post(getUser);

router.route("/logout").get(logout);

router.route("/registerMail").post(registerMail);

router.route("/generateOTP").post(generateOTP);

router.route("/verifyOTP").post(verifyOTP);

router.route("/createResetSession").get(createResetSession);

router.route("/resetPassword").put(resetPassword);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router
    .route("/admin/users")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);

router
    .route("/admin/user/:id")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);


module.exports = router;