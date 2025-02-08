import mongoose from "mongoose";
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{ type: String, required: true }],
  fieldOfStudy: { type: String, required: true },
  collaborators: [String],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, required: true },
  fundingSource: { type: String, required: true },
  fundingAmount: { type: Number, required: true },
  publications: [String],
  githubLink: { type: String },
  liveDemo: { type: String },
  images: [String],
  videos: [String],
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
