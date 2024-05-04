import express from "express";
import { deleteUser, forgetPassword, getAllUser, getSingleUser, getUserDetails, login, logout, resetPassword, signup, updatePassword, updateProfile, updateUserRole } from "../controllers/auth.controllers.js";
import { authRoles, isAuthUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup)

router.post("/login", login)

router.post("/password/forgot", forgetPassword)

router.put("/password/reset/:token", resetPassword)

router.post("/logout", logout)

router.get("/me", isAuthUser, getUserDetails)

router.put("/password/update", isAuthUser, updatePassword)

router.put("/me/update", isAuthUser, updateProfile)

router.get("/admin/users", isAuthUser, authRoles("admin"), getAllUser)

router
    .route("/admin/user/:id")
    .get(isAuthUser, authRoles("admin"), getSingleUser)
    .put(isAuthUser, authRoles("admin"), updateUserRole)
    .delete(isAuthUser, authRoles("admin"), deleteUser)

export default router