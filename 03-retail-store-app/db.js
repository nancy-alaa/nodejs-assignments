const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3308, // xaamp port 
    password: "",
    database: "retail_store"
});

connection.connect((err) => {
    if(err){
        console.log({ Message: "Failed to connect to database!" , Error: err});
    }
    else{
        console.log({ Message: "Connected to database successfully!"});
    }
});

module.exports = connection;