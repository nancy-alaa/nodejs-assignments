const connection = require('./db');

// Add a column “Category” to the Products table
const addCategoryCol = `
    ALTER TABLE Products
    ADD COLUMN Category VARCHAR(500);
`
// connection.execute(addCategoryCol, (err, result) => {
//     if(err) throw err;
//     console.log('Category Column added successfully');
    
// });

const dropCategoryCol = `
    ALTER TABLE Products
    DROP COLUMN Category;
`;
// connection.execute(dropCategoryCol, (err, result) => {
//     if (err) throw err;
//     console.log("Category Column deleted successfully");
// });

const alterContactNumber = `
    ALTER TABLE Suppliers
    MODIFY COLUMN contact_number VARCHAR(15);
`;
// connection.execute(alterContactNumber, (err, result) => {
//     if (err) throw err;
//     console.log("modified");
// });

const makeProductNameNotNull = `
    ALTER TABLE Products
    MODIFY COLUMN product_name VARCHAR(500) NOT NULL;
`;
// connection.execute(makeProductNameNotNull, (err, result) => {
//     if (err) throw err;
//     console.log("modified");
// });

const insertSupplier = `
    INSERT INTO Suppliers (supplier_name, contact_number)
    VALUES('FreshFoods', '01001234567');
`;

// connection.execute(insertSupplier, (err, result) => {
//     if(err){
//         console.log({Message: "Insertion to Suppliers Failed!", Error: err});
//     }
//     else{
//         console.log(result);
        
//         const supplier_id = result.insertId;
//         const insertProducts = `
//             INSERT INTO Products(product_name, product_price, stock_quantity, supplier_id)
//             VALUES 
//                 ('Milk', 15.00, 50, ?),
//                 ('Bread', 10.00, 30, ?),
//                 ('Eggs', 20.00, 40, ?);
//         `;

//         connection.execute(insertProducts, [supplier_id, supplier_id, supplier_id], (err, result) => {
//             if(err){
//                 console.log({ Message: "Insertion to Products Failed!", Error: err });
//             }
//             else{
//                 const findMilkId = `SELECT product_id FROM Products WHERE product_name=?`;
//                 connection.execute(findMilkId, ['Milk'], (err, result) => {
//                     if(err){
//                         console.log('something went wrong!');
//                     }
//                     else{
//                         const milkId = result[0].product_id;
//                         // insert sale to milk
//                         const insertSale = `
//                             INSERT INTO Sales (product_id, quantity_sold, sales_date)
//                             VALUES (?, 2, '2025-05-20')
//                         `;
//                         connection.execute(insertSale, [milkId], (err, result) => {
//                             if(err){
//                                 console.log(err);
//                             }
//                             else{
//                                 console.log('sale inserted successfully!');
                                
//                             }
//                         });
//                     }
//                 });
//             }
//         });

//     }
// });

//-------------------------------------------------

// update bread price
// const findBreadQuery = `
//     SELECT * FROM Products WHERE product_name = ?
// `;
// connection.execute(findBreadQuery, ['Bread'], (err, result) => {
//     if(err){
//         console.log(err);
//     }
//     else{
//         if(result.length == 0){
//             console.log('Item not found!');
//         }
//         else{
//             const updatePrice = `
//                 UPDATE Products
//                 SET product_price = ?
//                 WHERE product_name = ?
//             `;

//             connection.execute(updatePrice, [25, 'Bread'], (err, result) => {
//                 if(err){
//                     console.log("Failed to update price!", err);   
//                 }
//                 else{
//                     console.log(result);
//                 }
//             });
//         }
//     }
// });

// ---------------------------------------------

// Delete the product 'Eggs'.

// const deleteEggs = `
//     DELETE FROM Products
//     WHERE product_name = ?;
// `;
// connection.execute(deleteEggs, ['Eggs'], (err, result) => {
//     if(err){
//         console.log('Failed to delete product!', err);
//     }
//     else{
//         console.log("Product deleted successfully!", result);
        
//     }
// });