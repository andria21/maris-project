import mongoose from "mongoose";

const { Schema } = mongoose;

const exteriorProjectsSchema = new Schema({
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

export default mongoose.models.ExteriorProjects ||
  mongoose.model("ExteriorProjects", exteriorProjectsSchema);
