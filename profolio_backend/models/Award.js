import mongoose from "mongoose";

const awardsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    organization: { type: String },
    date: { type: Date },
    description: { type: String },
    citation: { type: String },
  },

  { timestamps: true }
);

export default mongoose.model("Awards", awardsSchema);
