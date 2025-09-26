import mongoose from "mongoose";

const { Schema } = mongoose;

const interiorProjectsSchema = new Schema({
  projectId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  desc: {
    type: String,
    required: false,
  },
  img: {
    type: String,
    required: true,
  },
});

export default mongoose.models.InteriorProjects ||
  mongoose.model("InteriorProjects", interiorProjectsSchema);
