import mongoose from "mongoose";

const researchSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    abstract: { type: String, required: true },
    authors: [{ type: String, required: true }],
    publishedDate: { type: Date, required: true },
    journal: { type: String },
    paperLink: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Research", researchSchema);
