import express from "express";
import { Application } from "../models/Application.js"; // ✅ use curly braces for named export

const router = express.Router();



// Define fees for each program
const programFees = {
  "Software Development (SOD)": 30000,
  "Computer Systems & Architecture (CSA)": 30000,
  "Networking & Internet Technology (NIT)": 30000,
  "Multimedia Productions (MMP)": 30000,
  "Electronics & Telecommunications (ETE)": 30000,
  "Electrical Technology (ELT)": 30000,
  "Teacher Training Program": 30000,
  "Holiday Program": 30000,
  "Technical Support & ICT Supply": 30000
};

// POST – Save application
router.post("/", async (req, res) => {
  try {
    const { fullName, email, phone, instagram, program } = req.body;

    if (!fullName || !email || !phone || !program) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const fee = programFees[program] || 0; // automatically assign fee

    const newApplication = new Application({
      fullName,
      email,
      phone,
      instagram,
      program,
      fee,
    });

    await newApplication.save();

    res.status(201).json({
      success: true,
      message: "Application submitted successfully ✅",
      fee
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error ❌",
    });
  }
});

export default router;
