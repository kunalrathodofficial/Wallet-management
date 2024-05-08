import { Router } from "express";
import { AuthenticationController } from "../controllers";

const router = Router();


router.post("/login", AuthenticationController.login);
router.post("/signup", AuthenticationController.signup);

export default router;
