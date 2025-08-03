const express = require("express");
const app = express();
const connection = require("./db");
const port = 3000;
app.use(express.json());

// APIs ---------------------

// --------------------------- update a product price by product name ----------------------------
app.patch("/update/:product_name", (req, res, next) => {
    const productName = req.params.product_name;
    const newPrice = req.body.product_price;

    if (!newPrice) {
        return res.status(400).json({ error: "Missing product_price" });
    }

    const query = "UPDATE Products SET product_price = ? WHERE product_name = ?";
    connection.execute(query, [newPrice, productName], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        return res.json({ message: "Price updated successfully" });
    });
});
// ------------------------------------------------------------------------------

// --------------------------- delete a product by product name -----------------
app.delete('/delete/:product_name', (req, res, next) => {
    const { product_name } = req.params;

    const deleteQuery = `
        DELETE FROM Products
        WHERE product_name = ?;
    `;
    connection.execute(deleteQuery, [product_name], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Server error");
        }

        if (result.affectedRows === 0) {
            return res.status(404).send("Product not found");
        }

        return res.send("Product deleted successfully");
    });
});
// ------------------------------------------------------------------------------

// --------------------------- Add Product ----------------------------
app.post('/addProduct', (req, res, next) => {
    const { product_name, product_price, stock_quantity, supplier_id } = req.body;

    if (!product_name || !product_price || !stock_quantity || !supplier_id) {
        return res.status(400).send("All fields are required");
    } else {
        const insertQuery = `
            INSERT INTO Products (product_name, product_price, stock_quantity, supplier_id)
            VALUES (?, ?, ?, ?);
        `;
        connection.execute(insertQuery, [
            product_name,
            product_price,
            stock_quantity,
            supplier_id,
        ], (err, result) => {
            if (err) {
                return res.status(400).json({ Message: "Insertion failed!", Error: err });
            }
            return res.status(200).json({ Message: "Product added successfully!", result });
        });
    }
});
// ------------------------------------------------------------------------------

// --------------------------- Retrieve the total quantity sold for each product ----------------------------
app.get('/products/summary', (req, res, next) => {
    const query = `
        SELECT 
            Products.product_name,
            SUM(Sales.quantity_sold) AS total_quantity_sold
        FROM
            Sales
        JOIN 
            Products ON Sales.product_id = Products.product_id
        GROUP BY
            Products.product_name;
    `;

    connection.execute(query, (err, result) => {
        if (err) {
            return res.status(400).json({ Message: "Query Error!", Error: err });
        }
        return res.status(200).json({ Message: "Done!", result });
    });
});
// ------------------------------------------------------------------------------

// --------------------------- Get the product with the highest stock ----------------------------
app.get('/products/higheststock', (req, res, next) => {
    const query = `
        SELECT * FROM Products
        WHERE stock_quantity = (
            SELECT MAX(stock_quantity) FROM Products
        );
    `;
    connection.execute(query, (err, result) => {
        if (err) {
            return res.status(400).json({ Message: "Query Error!", Error: err });
        }
        return res.status(200).json({ Message: "Done!", result });
    });
});
// ------------------------------------------------------------------------------

// --------------------------- Find suppliers with names starting with 'F' ----------------------------
app.get('/suppliers/start-with-f', (req, res, next) => {
    const query = `
        SELECT * FROM SUPPLIERS 
        WHERE supplier_name LIKE 'F%';
    `;
    connection.execute(query, (err, result) => {
        if (err) {
            return res.status(500).json({ Message: "Query Error!", Error: err });
        }
        return res
            .status(200)
            .json({ Message: "Suppliers starting with F", result });
    });
});
// ------------------------------------------------------------------------------

// --------------------------- Show all products that have never been sold ----------------------------
app.get('/products/unsold', (req, res, next) => {
    const query = `
        SELECT * FROM Products
        WHERE product_id NOT IN (
            SELECT product_id FROM Sales
        );
    `;
    connection.execute(query, (err, result) => {
        if (err) {
            return res.status(500).json({ Message: "Query Error!", Error: err });
        }
        return res
            .status(200)
            .json({ Message: "Products that have never been sold", result });
    });
});
// ------------------------------------------------------------------------------

// --------------------------- Get all sales along with product name and sale date -------------------------
app.get('/sales/products', (req, res, next) => {
    const query = `
        SELECT Sales.sale_id,
                Products.product_name,
                Sales.quantity_sold,
                Sales.sales_date
        FROM Sales
        JOIN Products ON Sales.product_id = Products.product_id;
    `;
    connection.execute(query, (err, result) => {
        if (err) {
            return res.status(500).json({ Message: "Query Error!", Error: err });
        }
        return res
            .status(200)
            .json({ Message: "All Sales with product name", result });
    });
});

app.listen(port, () => {
    console.log(
        `Server is running successfully on port http://localhost:${port}`
    );
});
