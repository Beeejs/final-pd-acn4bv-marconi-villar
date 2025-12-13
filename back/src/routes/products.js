/* Express */
import express from "express";
/* Controllers */
import { getProducts, getProduct, createProduct, updateProduct } from "../controllers/productController.js";
/* Middlewares */
import { verifyAdmin, verifyToken } from "../middlewares/auth.js";

const productRouter = express.Router();

productRouter.get("/getAll", getProducts); // Rutas publicas
productRouter.get("/getOne/:id", getProduct); // Rutas publicas
productRouter.post("/create", verifyToken, verifyAdmin, createProduct);
productRouter.post("/update/:id", verifyToken, verifyAdmin, updateProduct);

export default productRouter;