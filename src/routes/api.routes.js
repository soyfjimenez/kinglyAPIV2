import {Router} from "express";
import {methods as controller} from "./../controllers/api.controller.js";
const router = Router();

router.get("/", controller.getAllProducts);
/*router.post("/", controller.addProduct);
router.delete("/:ref", controller.deleteProduct);
router.patch("/:ref", controller.modifyProduct);*/

export default router;