import mongoose from "mongoose";

interface Activation {
    _id: string;
    accountId: string;
    createdAt: Date;
  }
  const activationSchema = new mongoose.Schema<Activation>({
    accountId: String,
  },{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
  

export const ActivationModel = mongoose.models.Activation ||  mongoose.model<Activation>('Activation', activationSchema);
