import mongoose from "mongoose";

interface Category {
  _id: string;
  vendor: string;
  name: string;
  units: string;
  status: string;
  createdAt: Date;
}

const categorySchema = new mongoose.Schema<Category>(
  {
    vendor: String,
    name: String,
    units: String,
    status: String,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export const CategoryModel =
  mongoose.models.Category ||
  mongoose.model<Category>("Category", categorySchema);
