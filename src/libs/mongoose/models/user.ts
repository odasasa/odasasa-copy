import mongoose from "mongoose";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  status: string;
  phone: string;
  password: string;
}

const userSchema = new mongoose.Schema<User>({
  name: String,
  email: String,
  role: String,
  status: String,
  phone: String,
  password: String,
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });



  export const UserModel = mongoose.models.User ||  mongoose.model<User>('User', userSchema);
