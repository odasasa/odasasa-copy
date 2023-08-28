import mongoose from "mongoose";

interface Banner {
    _id: string;
    vendorId: string;
    name: string;
    status: string;
    createdAt: Date;
  }
  const bannerSchema = new mongoose.Schema<Banner>({
    vendorId: String,
    name: String,
    status: String,
  },{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
  


export const BannerModel = mongoose.models.Banner ||  mongoose.model<Banner>('Banner', bannerSchema);
