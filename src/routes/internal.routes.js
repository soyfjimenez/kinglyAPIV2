import {Router} from "express";
import {methods as controller} from "./../controllers/internal.controller.js";
const router = Router();

router.get("/", controller.getAllProductsSorted);
router.get("/ref/:ref/", controller.getFullProduct);
router.get("/:cat/", controller.getCatSorted);
router.post("/refs/", controller.getReferences);

router.post("/", controller.addProduct);
router.delete("/:ref", controller.deleteProduct);


export default router;