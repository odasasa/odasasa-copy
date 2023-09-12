import mongoose from "mongoose";

interface Banner {
  _id: string;
  vendor: string;
  name: string;
  src: string;
  status: string;
  createdAt: Date;
}
const bannerSchema = new mongoose.Schema<Banner>({
  vendor: {
    type: String,
    required: true
  },
  name: String,
  src: {
    type: String,
    required: true
  },
  status: String,
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });



export const BannerModel = mongoose.models.Banner || mongoose.model<Banner>('Banner', bannerSchema);
