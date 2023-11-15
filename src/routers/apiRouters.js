import express from "express";
import {protectorMiddleware, s3Uploader} from "../middlewares";
import {
  getCommunity,
  getCommunityById,
  postCommunity,
  postImage,
  putCommunityById
} from "../controllers/apiControllers";

const router = express.Router();
router.post('/v1/image', s3Uploader.single('file'), protectorMiddleware, postImage);
router.post('/v1/community', s3Uploader.array('files'), protectorMiddleware, postCommunity);
router.get('/v1/community', getCommunity);
router.get('/v1/community/:id', getCommunityById);
router.put('/v1/community/:id', putCommunityById);

export default router;
