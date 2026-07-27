import express from "express";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";

import { validateCreateUser } from "../validators/user.validator.js";

import {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    updateStatus,
    deleteUser
} from "../controllers/user.controller.js";

const router = express.Router();

router.use(authenticate);

router.post(
    "/",
    authorize("super_admin"),
    validateCreateUser,
    createUser
);

router.get(
    "/",
    authorize("super_admin"),
    getUsers
);

router.get(
    "/:id",
    authorize("super_admin"),
    getUserById
);

router.put(
    "/:id",
    authorize("super_admin"),
    updateUser
);

router.patch(
    "/:id/status",
    authorize("super_admin"),
    updateStatus
);

router.delete(
    "/:id",
    authorize("super_admin"),
    deleteUser
);

export default router;