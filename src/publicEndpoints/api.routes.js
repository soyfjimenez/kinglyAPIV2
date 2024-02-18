import {Router} from "express";
import {methods as controller} from "./api.controller.js";
const router = Router();

router.get("/:country", controller.getAllProducts);
router.get("/:country/ref/:ref/", controller.getSingleProduct);
router.get("/:country/cat/:cat/", controller.getCat);


export default router;