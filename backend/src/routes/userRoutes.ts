import { Router } from "express";
import {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
  getPublicFeed,
} from "../controllers/userController";
import { isAuthenticated } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validateMiddleware";
import {
  updateProfileValidation,
  deleteProfileValidation,
  getProfileValidation,
} from "../validation/userValidation";

const router = Router();

router.post(
  "/profile",
  isAuthenticated,
  validate(updateProfileValidation),
  createProfile
);

router.get(
  "/profile",
  isAuthenticated,
  validate(getProfileValidation),
  getProfile
);

router.put(
  "/profile",
  isAuthenticated,
  validate(updateProfileValidation),
  updateProfile
);

router.delete(
  "/profile",
  isAuthenticated,
  validate(deleteProfileValidation),
  deleteProfile
);

router.get("/public-feed", isAuthenticated, getPublicFeed);

export default router;
