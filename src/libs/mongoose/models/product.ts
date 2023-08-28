import mongoose from "mongoose";

interface Product {
    _id: string;
    vendorId: string;
    name: string;
    description: string;
    category: string;
    unit: string;
    img: string;
    price: number;
    status: string;
    createdAt: Date;
  }

  const productSchema = new mongoose.Schema<Product>({
    vendorId: String,
    name: String,
    description: String,
    category: String,
    unit: String,
    img: String,
    price: Number,
    status: String,
  },{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
  
  export const ProductModel = mongoose.models.Product ||  mongoose.model<Product>('Product', productSchema);
