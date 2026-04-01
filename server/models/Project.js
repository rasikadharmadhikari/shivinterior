import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    projectType: { type: String, required: true },
    location: { type: String, required: true },
    year: { type: Number, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    beforeImages: { type: [String], default: [] },
    afterImages: { type: [String], default: [] },
  },
  { timestamps: true },
);

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
export { Project };
