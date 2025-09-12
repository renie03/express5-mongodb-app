import express from "express";
import {
  createUser,
  deleteUser,
  getPaginatedUsers,
  updateUser,
  updateUserAdmin,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/paginated", verifyToken, getPaginatedUsers);
router.post("/", verifyToken, createUser);
router.put("/:id", verifyToken, updateUser);
router.put("/admin/:id", verifyToken, updateUserAdmin);
router.delete("/:id", verifyToken, deleteUser);

export default router;
