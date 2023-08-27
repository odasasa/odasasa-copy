
// import sqlite3 from 'sqlite3';

// const app = express();
// const port = 3000;

// const dbFilePath = './db/database.db'; // Change this to the path of your database file
// const db = new sqlite3.Database(dbFilePath);

// app.use(bodyParser.json());

// // Create a new product
// app.post('/products', (req, res) => {
//     const product = req.body;
    
//     db.run(
//         'INSERT INTO products (id, name, description, category, unit, img, price, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
//         [
//             product.id,
//             product.name,
//             product.description,
//             product.category,
//             product.unit,
//             product.img,
//             product.price,
//             product.status,
//             product.createdAt.toISOString(),
//         ],
//         (err) => {
//             if (err) {
//                 console.error('Error creating product:', err.message);
//                 res.status(500).json({ error: 'Failed to create product' });
//             } else {
//                 res.status(201).json({ message: 'Product created successfully' });
//             }
//         }
//     );
// });

// // Get all products
// app.get('/products', (req, res) => {
//     db.all('SELECT * FROM products', (err, rows) => {
//         if (err) {
//             console.error('Error fetching products:', err.message);
//             res.status(500).json({ error: 'Failed to fetch products' });
//         } else {
//             res.status(200).json(rows);
//         }
//     });
// });

// // Get a specific product by ID
// app.get('/products/:id', (req, res) => {
//     const productId = req.params.id;

//     db.get('SELECT * FROM products WHERE id = ?', [productId], (err, row) => {
//         if (err) {
//             console.error('Error fetching product:', err.message);
//             res.status(500).json({ error: 'Failed to fetch product' });
//         } else {
//             if (row) {
//                 res.status(200).json(row);
//             } else {
//                 res.status(404).json({ error: 'Product not found' });
//             }
//         }
//     });
// });

// // Update a product by ID
// app.put('/products/:id', (req, res) => {
//     const productId = req.params.id;
//     const updatedProduct = req.body;

//     db.run(
//         'UPDATE products SET name = ?, description = ?, category = ?, unit = ?, img = ?, price = ?, status = ?, createdAt = ? WHERE id = ?',
//         [
//             updatedProduct.name,
//             updatedProduct.description,
//             updatedProduct.category,
//             updatedProduct.unit,
//             updatedProduct.img,
//             updatedProduct.price,
//             updatedProduct.status,
//             updatedProduct.createdAt.toISOString(),
//             productId,
//         ],
//         (err) => {
//             if (err) {
//                 console.error('Error updating product:', err.message);
//                 res.status(500).json({ error: 'Failed to update product' });
//             } else {
//                 res.status(200).json({ message: 'Product updated successfully' });
//             }
//         }
//     );
// });

// // Delete a product by ID
// app.delete('/products/:id', (req, res) => {
//     const productId = req.params.id;

//     db.run('DELETE FROM products WHERE id = ?', [productId], (err) => {
//         if (err) {
//             console.error('Error deleting product:', err.message);
//             res.status(500).json({ error: 'Failed to delete product' });
//         } else {
//             res.status(200).json({ message: 'Product deleted successfully' });
//         }
//     });
// });

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
