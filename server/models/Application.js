// models/application.js
import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    program: { type: String, required: true },
    fee: { type: Number, required: true },
    status: { 
      type: String, 
      enum: ["pending", "accepted", "rejected"],
      default: "pending" 
    },
    deleted: { type: Boolean, default: false } // For soft delete with undo
  },
  { timestamps: true }
);

export const Application = mongoose.model("Application", applicationSchema);