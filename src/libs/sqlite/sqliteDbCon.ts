import path from "path";

const sqlite3 = require('sqlite3').verbose();

const dbFilePath = path.resolve(__dirname,'db/database.db'); // Change this to the path of your database file



// Connecting to or creating a new SQLite database file
// console.log(process.cwd(), "folder")
const db = new sqlite3.Database(
    "/database.db",
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err:any) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Connected to the SQlite database.");
    }
  );

// Define your table creation queries based on the provided interfaces
const createProductsTableQuery = `
    CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        vendorId TEXT,
        name TEXT,
        description TEXT,
        category TEXT,
        unit TEXT,
        img TEXT,
        price REAL,
        status TEXT,
        createdAt datetime DEFAULT CURRENT_TIMESTAMP
    )
`;

const createCategoriesTableQuery = `
    CREATE TABLE IF NOT EXISTS categories (
        vendorId TEXT
        id TEXT PRIMARY KEY,
        name TEXT,
        description TEXT,
        unit TEXT,
        status TEXT,
        createdAt datetime DEFAULT CURRENT_TIMESTAMP
    )
`;

const createBannersTableQuery = `
    CREATE TABLE IF NOT EXISTS banners (
        vendorId TEXT
        id TEXT PRIMARY KEY,
        name TEXT,
        status TEXT,
        createdAt datetime DEFAULT CURRENT_TIMESTAMP
    )
`;

const createPaymentsTableQuery = `
    CREATE TABLE IF NOT EXISTS payments (
        vendorId TEXT 
        id TEXT PRIMARY KEY,
        name TEXT,
        status TEXT,
        refNo TEXT,
        amount REAL,
        createdAt datetime DEFAULT CURRENT_TIMESTAMP,
        packageId TEXT
    )
`;

const createPackagesTableQuery = `
    CREATE TABLE IF NOT EXISTS packages (
        id TEXT PRIMARY KEY,
        name TEXT,
        price REAL,
        createdAt datetime DEFAULT CURRENT_TIMESTAMP,
        status TEXT
    )
`;

const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT,
        email TEXT,
        role TEXT,
        createdAt datetime DEFAULT CURRENT_TIMESTAMP,
        status TEXT,
        phone TEXT,
        password TEXT
    )
`;

const createActivationTableQuery = `
    CREATE TABLE IF NOT EXISTS activation (
        id TEXT PRIMARY KEY,
        accountId TEXT,
        createdAt datetime DEFAULT CURRENT_TIMESTAMP
    )
`;

// Execute the table creation queries
db.serialize(() => {
    db.run(createProductsTableQuery);
    db.run(createCategoriesTableQuery);
    db.run(createBannersTableQuery);
    db.run(createPaymentsTableQuery);
    db.run(createPackagesTableQuery);
    db.run(createUsersTableQuery);
    db.run(createActivationTableQuery);
});

// Close the database connection
db.close((err: Error | null) => {
    if (err) {
        console.error('Error closing the database:', err.message);
    } else {
        console.log('Database connection closed.');
    }
});


export default db;