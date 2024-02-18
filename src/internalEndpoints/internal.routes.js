import {Router} from "express";
import {methods as controller} from "./internal.controller.js";
import {translateFields} from "../tasks/translateFields.js"
const router = Router();
router.get("/languages/", controller.getLanguages);
router.get("/productFields/", controller.getProductFields);
router.get("/", controller.getAllProductsSorted);
router.get("/ref/:ref/", controller.getFullProduct);
router.get("/cat/:cat/", controller.getCatSorted);


router.post("/refs/", controller.getReferences);
router.post("/", controller.addProduct);
router.delete("/:ref", controller.deleteProduct);

//Taks
router.post("/task/translateFields", translateFields);

//Endpoints
router.get("/end/productIndex", controller.getProductIndex);
export default router;