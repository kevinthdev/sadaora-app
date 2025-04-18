import { Router } from "express";
import { signup, login } from "../controllers/authController";
import {
  signUpValidation,
  loginValidation,
} from "../validation/authValidation";
import { validate } from "../middlewares/validateMiddleware";

const router = Router();

router.post("/signup", validate(signUpValidation), signup);
router.post("/login", validate(loginValidation), login);

export default router;
