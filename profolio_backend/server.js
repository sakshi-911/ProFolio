import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import researchRoutes from "./routes/researchRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import conferenceRoutes from "./routes/conferenceRoutes.js";
import achievementRoutes from "./routes/achievementRoutes.js";
import teachingRoutes from "./routes/teachingRoutes.js";
import collaborationRoutes from "./routes/collaborationRoutes.js";
import awardRoutes from "./routes/awardRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/research", researchRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/conferences", conferenceRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/teaching", teachingRoutes);
app.use("/api/collaborations", collaborationRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/awards", awardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
