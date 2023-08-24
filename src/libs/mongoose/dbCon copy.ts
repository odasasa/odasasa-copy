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
  createdAt: { type: Date, default: Date.now },
});

const categorySchema = new mongoose.Schema<Category>({
  vendorId: String,
  name: String,
  description: String,
  unit: String,
  status: String,
  createdAt: { type: Date, default: Date.now },
});

const bannerSchema = new mongoose.Schema<Banner>({
  vendorId: String,
  name: String,
  status: String,
  createdAt: { type: Date, default: Date.now },
});

const paymentSchema = new mongoose.Schema<Payment>({
  vendorId: String,
  name: String,
  status: String,
  refNo: String,
  amount: Number,
  createdAt: { type: Date, default: Date.now },
  packageId: String,
});

const packageSchema = new mongoose.Schema<Package>({
  name: String,
  price: Number,
  createdAt: { type: Date, default: Date.now },
  status: String,
});

const userSchema = new mongoose.Schema<User>({
  name: String,
  email: String,
  role: String,
  createdAt: { type: Date, default: Date.now },
  status: String,
  phone: String,
  password: String,
});

const activationSchema = new mongoose.Schema<Activation>({
  accountId: String,
  createdAt: { type: Date, default: Date.now },
});

// Create models using the defined schemas
const CreateProductModel = ()=>mongoose.model<Product>('Product', productSchema);
const CreateCategoryModel = ()=>mongoose.model<Category>('Category', categorySchema);
const CreateBannerModel = ()=>mongoose.model<Banner>('Banner', bannerSchema);
const CreatePaymentModel = ()=>mongoose.model<Payment>('Payment', paymentSchema);
const CreatePackageModel = ()=>mongoose.model<Package>('Package', packageSchema);
const CreateUserModel = ()=>mongoose.model<User>('User', userSchema);
const CreateActivationModel = ()=>mongoose.model<Activation>('Activation', activationSchema);

export {
  CreateProductModel,
  CreateCategoryModel,
  CreateBannerModel,
  CreatePaymentModel,
  CreatePackageModel,
  CreateUserModel,
  CreateActivationModel,
};
