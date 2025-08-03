const connection = require('./db');

const createSuppliersTable = `
    CREATE TABLE IF NOT EXISTS Suppliers(
    supplier_id INT(11) AUTO_INCREMENT PRIMARY KEY,
    supplier_name VARCHAR(500),
    contact_number VARCHAR(500)
    );

`;


const createProductsTable = `
    CREATE TABLE IF NOT EXISTS Products(
    product_id INT(11) AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(500),
    product_price DECIMAL(10, 2),
    stock_quantity INT,
    supplier_id INT(11),
    FOREIGN KEY (supplier_id) REFERENCES Suppliers(supplier_id)
    );
`;

const createSalesTable = `
    CREATE TABLE IF NOT EXISTS Sales(
    sale_id INT(11) AUTO_INCREMENT PRIMARY KEY,
    product_id INT(11),
    quantity_sold INT,
    sales_date DATE,
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
    );
`;

connection.query(createSuppliersTable, (err) => {
    if(err) throw err;
    console.log("Suppliers table created successfully!");

    connection.query(createProductsTable, (err) => {
        if(err) throw err;
        console.log("Products table created successfully!");

        connection.query(createSalesTable, (err) => {
            if(err) throw err;
            console.log("Sales table created successfully!");
        });
    });    
});


