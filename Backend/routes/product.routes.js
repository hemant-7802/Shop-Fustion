import express from "express";
import { createProduct, createProductReview, deleteProduct, deleteReview, getAllproducts, getProductDetails, getProductReviews, updateProduct } from "../controllers/product.controllers.js";
import { authRoles, isAuthUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/admin/product/new", isAuthUser, authRoles("admin"), createProduct)
router.get("/products", getAllproducts);
router
    .route("/admin/product/:id")
    .put(isAuthUser, authRoles("admin"), updateProduct)
    .delete(isAuthUser, authRoles("admin"), deleteProduct)

router.get("/product/:id", getProductDetails)
router.put("/review", isAuthUser, createProductReview)

router
    .route("/reviews")
    .get(getProductReviews)
    .delete(isAuthUser, deleteReview)

export default router;