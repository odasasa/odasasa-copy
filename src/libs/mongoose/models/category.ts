import mongoose from "mongoose";

  
  interface Category {
    _id: string;
    vendorId: string;
    name: string;
    description: string;
    unit: string;
    status: string;
    createdAt: Date;
  }

const categorySchema = new mongoose.Schema<Category>({
    vendorId: String,
    name: String,
    description: String,
    unit: String,
    status: String,
  },{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
  

export const CategoryModel = mongoose.models.Category ||  mongoose.model<Category>('Category', categorySchema);
