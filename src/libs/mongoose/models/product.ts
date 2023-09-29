import { Product } from "@/types";
import mongoose from "mongoose";


const productSchema = new mongoose.Schema<Product>(
  {
    
    name: String,
    description: String,
    category: String,
    vendor: String,
    units: String,
    img: String,
    price: Number,
    status: String,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export const ProductModel =
  mongoose.models.Product || mongoose.model<Product>("Product", productSchema);
