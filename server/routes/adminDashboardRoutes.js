import express from "express";
import {
  getDashboardStats,
  getAllApplications,
  updateApplicationStatus,
  getAllMessages,
  markMessageRead,
  deleteApplication,
  deleteMessage,
  getAdminProfile,
  updateAdminInfo
  // changeAdminPassword  // Temporarily comment this out
} from "../controllers/adminDashboardController.js";

import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Dashboard stats
router.get("/dashboard", protectAdmin, getDashboardStats);

// Applications
router.get("/applications", protectAdmin, getAllApplications);
router.patch("/applications/:id", protectAdmin, updateApplicationStatus);
router.delete("/applications/:id", protectAdmin, deleteApplication);

// Messages
router.get("/messages", protectAdmin, getAllMessages);
router.patch("/messages/:id/read", protectAdmin, markMessageRead);
router.delete("/messages/:id", protectAdmin, deleteMessage);

// ADMIN PROFILE
router.get("/profile", protectAdmin, getAdminProfile);
router.patch("/profile", protectAdmin, updateAdminInfo);
// router.patch("/change-password", protectAdmin, changeAdminPassword); // Temporarily comment out

export default router;