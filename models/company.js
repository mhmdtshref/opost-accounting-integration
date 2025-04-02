import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Company name is required"],
    maxlength: [60, "Company name cannot be more than 60 characters"],
  },
});

export const Company = mongoose.models.Company || mongoose.model("Company", CompanySchema);
