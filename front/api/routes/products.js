import express from "express";
/* Controllers */
import productController from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/getAll", productController.getProducts);

export default productRouter;