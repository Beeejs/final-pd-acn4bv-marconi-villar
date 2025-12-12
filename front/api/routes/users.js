import express from "express";
/* Controllers */
import userController from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/sync-user", userController.syncUser);
userRouter.get('/getAll', userController.getUsers);
userRouter.post('/rol/:id', userController.updateUserRole);

export default userRouter;