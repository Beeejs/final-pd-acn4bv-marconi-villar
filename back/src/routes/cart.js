/* Express */
import express from "express";
/* Controllers */
import {
  getCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
} from "../controllers/cartController.js";
/* Middlewares */
import { verifyToken } from "../middlewares/auth.js";

const cartRouter = express.Router();

cartRouter.get("/", verifyToken, getCart);
cartRouter.post("/add", verifyToken, addToCart);
cartRouter.post("/item/:itemId", verifyToken, updateCartItem);
cartRouter.post("/delete/:itemId", verifyToken, deleteCartItem);
cartRouter.post("/clear", verifyToken, clearCart);

export default cartRouter;
