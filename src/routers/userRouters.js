import express from "express";
import {
  deleteUser,
  getCommunity,
  getEditPW,
  getEditUser,
  postEditPW,
  postEditUser,
} from "../controllers/userControllers";
import {avatarUpload, beforeDeleteUser, protectorMiddleware,} from "../middlewares";

const userRouter = express.Router();

// userRouter.get("/:id([0-9a-f]{24})", seeUser);
userRouter
  .route("/edit")
  .all(protectorMiddleware)
  .get(getEditUser)
  .post(avatarUpload.single("avatar"), postEditUser);
userRouter
  .route("/editPW")
  .all(protectorMiddleware)
  .get(getEditPW)
  .post(postEditPW);
userRouter.get("/beforeDelete", protectorMiddleware, beforeDeleteUser);
userRouter.get("/delete", protectorMiddleware, deleteUser);
userRouter.get("/community", protectorMiddleware, getCommunity);

export default userRouter;
