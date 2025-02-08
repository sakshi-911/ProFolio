import mongoose from "mongoose";

const teachingExperienceSchema = new mongoose.Schema(
  {
    courseName: { type: String, required: true },
    courseCode: { type: String },
    institution: { type: String, required: true },
    department: { type: String },
    semester: { type: String, required: true },
    duration: { type: String },
    level: {
      type: String,
      enum: ["Undergraduate", "Postgraduate", "PhD"],
      required: true,
    },
    description: { type: String },
    methodologies: [String],
    materials: [{ title: String, link: String }],
    studentFeedback: [{ year: Number, rating: Number, comments: String }],
    guestLectures: [{ title: String, speaker: String, date: Date }],
  },
  { timestamps: true }
);

export default mongoose.model("TeachingExperience", teachingExperienceSchema);
