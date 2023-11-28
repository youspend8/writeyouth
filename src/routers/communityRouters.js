import express from "express";
import {community, communityDetail, communityEdit, communityWrite} from "../controllers/communityControllers";
import {protectorMiddleware} from "../middlewares";

const router = express.Router();
router.get('', community);
router.get('/write', protectorMiddleware, communityWrite);
router.get('/:id', communityDetail);
router.get('/edit/:id', communityEdit);

export default router;
