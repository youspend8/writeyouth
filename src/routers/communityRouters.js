import express from "express";
import {community, communityDetail, communityWrite} from "../controllers/communityControllers";
import {protectorMiddleware} from "../middlewares";

const router = express.Router();
router.get('', community);
router.get('/write', protectorMiddleware, communityWrite);
router.get('/:id', communityDetail);

export default router;
