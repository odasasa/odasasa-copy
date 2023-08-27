import mongoose from 'mongoose';

// c9XddCqLzuNiDNDQ

function getDbURI(dbname: string) {
  const MONGO_DB_URI_DEV = `mongodb://localhost:27017/${dbname}?retryWrites=true&w=majority`;
  const ENV = process.env.NODE_ENV || 'developemnt'

  return ENV === "production"
    ? `mongodb+srv://${process.env.NEXT_PUBLIC_MONGO_USER}:${process.env.MONGO_PWD}@cluster0.2f29nts.mongodb.net/${dbname}?retryWrites=true&w=majority`
    : MONGO_DB_URI_DEV;

}
const MONGO_DB_URI = getDbURI('splendid_media_db')

// export const db = mongoose.createConnection(MONGO_DB_URI);
export function dbCon() {
  // Connecting to MongoDB using Mongoose
  mongoose.connect('mongodb://127.0.0.1:27017/mydatabase');
  const db = mongoose.connection;

  db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
  });
  db.once('open', () => {
    console.log('Connected to MongoDB database.');
  });

}
