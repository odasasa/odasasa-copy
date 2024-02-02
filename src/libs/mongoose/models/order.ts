import mongoose, { Document, Model } from "mongoose";
import { Schema } from "yup";

type CartProduct = {
  name: string;
  quantity: number;
  price: number;
  id?: string;
};

interface IOrderCustomer {
  name: string;
  phone: string;
  location: string;
}

export interface  Order extends Document {
  vendor: string;
  status: string;
  customer: IOrderCustomer;
  cart: CartProduct[];
}

const OrderSchema = new mongoose.Schema<Order>(
  {
    vendor: String,
     status:{type: String, default:'pending'},
    customer: {
      name: String,
      phone: String,
      location: String,
    },
    cart: [
      {
        name: String,
        quantity: Number,
        price: Number,
        _id: String,
      },
    ],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const OrderModel: Model<Order> =
  mongoose.models.Order || mongoose.model<Order>("Order", OrderSchema);

export { OrderModel}
