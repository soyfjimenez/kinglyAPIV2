import {Router} from "express";
import {methods as controller} from "./../controllers/api.controller.js";
const router = Router();

router.get("/:country", controller.getAllProducts);
router.get("/:country/ref/:ref/", controller.getSingleProduct);
router.get("/:country/socks/", controller.getSocks);
router.get("/:country/compactTextiles/", controller.getCompactTextiles);
router.get("/:country/packaging/", controller.getPackaging);
router.get("/:country/knitwear/", controller.getKnitwear);
router.get("/:country/towels/", controller.getTowels);


router.post("/", controller.addProduct);
router.delete("/:ref", controller.deleteProduct);
/*
router.patch("/:ref", controller.modifyProduct);*/

export default router;