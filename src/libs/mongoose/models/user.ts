import { User } from "@/types/core";
import mongoose from "mongoose";
import * as Yup from "yup";

// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   idNumber: string;
//   role: string;
//   createdAt: Date;
//   status: string;
//   phone: string;
//   password: string;
//   bu
// }

const userSchema = new mongoose.Schema<User>(
  {
    name: {
      type: String,
      required: [true, "Full Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      index: true,
      validate: {
        validator: (value: string) => {
          return Yup.string().email("Invalid email address").isValidSync(value);
        },
        message: "Invalid email address",
      },
    },
    idNumber: {
      type: String,
      unique: true,
      index: true,
      required: [true, "ID Number is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
    businessName: {
      type: String,
      required: [true, "Business Name is required"],
    },
    vendor: {
      type: String,
      unique: true,
      index: true,
      required: [true, "Business Code is required"],
    },
    phone: {
      type: String,
      unique: true,
      index: true,
      required: [true, "Phone is required"],
    },
    status: Boolean,
    role: {
      type: String,
      required: [true, "Role is required"],
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    strict: true,
  }
);

const UserModel =
  mongoose.models.User || mongoose.model<User>("User", userSchema);


export { UserModel };
