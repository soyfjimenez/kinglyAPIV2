import {Router} from "express";
import {methods as controller} from "./../controllers/api.controller.js";
const router = Router();

router.get("/:country", controller.getAllProducts);
router.get("/:country/ref/:ref/", controller.getSingleProduct);
router.get("/:country/:cat/", controller.getCat);
router.post("/:country/refs/", controller.getReferences);

export default router;