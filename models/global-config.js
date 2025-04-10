import mongoose from "mongoose";

const GlobalConfigSchema = new mongoose.Schema({
  tags: {
    type: [String],
    required: [true, "tags are required"],
  }
});

export const GlobalConfig = mongoose.models.GlobalConfig || mongoose.model("GlobalConfig", GlobalConfigSchema);
