import mongoose from "mongoose";

const { Schema } = mongoose;

const blogPostSchema = new Schema({
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

export default mongoose.models.InteriorPost ||
  mongoose.model("InteriorPost", blogPostSchema);
