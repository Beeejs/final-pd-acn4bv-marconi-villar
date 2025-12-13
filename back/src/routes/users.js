/* Express */
import express from "express";
/* Controllers */
import { syncUser, getUsers, updateUserRole } from "../controllers/userController.js";
/* Middlewares */
import { verifyAdmin, verifyToken } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/sync-user", verifyToken, syncUser);
userRouter.get("/all", verifyToken, verifyAdmin, getUsers);
userRouter.post("/role/:id", verifyToken, verifyAdmin, updateUserRole);

export default userRouter;