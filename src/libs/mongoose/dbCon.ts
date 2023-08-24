import mongoose from 'mongoose';


// Connecting to MongoDB using Mongoose
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase');
const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});
db.once('open', () => {
  console.log('Connected to MongoDB database.');
});

// Define schemas for your collections
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

interface Category {
  _id: string;
  vendorId: string;
  name: string;
  description: string;
  unit: string;
  status: string;
  createdAt: Date;
}

interface Banner {
  _id: string;
  vendorId: string;
  name: string;
  status: string;
  createdAt: Date;
}

interface Payment {
  _id: string;
  vendorId: string;
  name: string;
  status: string;
  refNo: string;
  amount: number;
  createdAt: Date;
  packageId: string;
}

interface Package {
  _id: string;
  name: string;
  price: number;
  createdAt: Date;
  status: string;
}

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

interface Activation {
  _id: string;
  accountId: string;
  createdAt: Date;
}

// Define schemas using Mongoose
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

const categorySchema = new mongoose.Schema<Category>({
  vendorId: String,
  name: String,
  description: String,
  unit: String,
  status: String,
},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const bannerSchema = new mongoose.Schema<Banner>({
  vendorId: String,
  name: String,
  status: String,
},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const paymentSchema = new mongoose.Schema<Payment>({
  vendorId: String,
  name: String,
  status: String,
  refNo: String,
  amount: Number,
   packageId: String,
},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const packageSchema = new mongoose.Schema<Package>({
  name: String,
  price: Number,
   status: String,
},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const userSchema = new mongoose.Schema<User>({
  name: String,
  email: String,
  role: String,
   status: String,
  phone: String,
  password: String,
},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const activationSchema = new mongoose.Schema<Activation>({
  accountId: String,
},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// Create models using the defined schemas
export const ProductModel = mongoose.models.ProductModel || mongoose.model<Product>('Product', productSchema);
export const CategoryModel = mongoose.models.CategoryModel || mongoose.model<Category>('Category', categorySchema);
export const BannerModel = mongoose.models.BannerModel || mongoose.model<Banner>('Banner', bannerSchema);
export const PaymentModel = mongoose.models.PaymentModel || mongoose.model<Payment>('Payment', paymentSchema);
export const PackageModel = mongoose.models.PackageModel || mongoose.model<Package>('Package', packageSchema);
export const UserModel = mongoose.models.UserModel || mongoose.model<User>('User', userSchema);
export const ActivationModel = mongoose.models.ActivationModel || mongoose.model<Activation>('Activation', activationSchema);


