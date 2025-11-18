import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: [String],
    },

    parentCatName: {
      type: String,
    },

    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "category",
    },
  },
  { timestamps: true }
);

const CategoryModel = mongoose.model("category", categorySchema);
export default CategoryModel;
