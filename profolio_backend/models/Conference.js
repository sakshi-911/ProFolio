import mongoose from "mongoose";

const conferenceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    details: { type: String },
    link: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Conference", conferenceSchema);
