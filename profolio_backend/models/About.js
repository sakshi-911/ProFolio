import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    bio: { type: String, required: true },
    contactEmail: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("About", aboutSchema);
