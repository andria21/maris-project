import mongoose from "mongoose";

const { Schema } = mongoose;

const exteriorPostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});

export default mongoose.models.ExteriorPosts ||
  mongoose.model("ExteriorPosts", exteriorPostSchema);
