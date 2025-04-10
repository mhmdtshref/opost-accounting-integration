import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Company name is required"],
    maxlength: [60, "Company name cannot be more than 60 characters"],
  },
  tags: {
    type: [String],
    required: [true, "Company tags are required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export const Company = mongoose.models.Company || mongoose.model("Company", CompanySchema);
