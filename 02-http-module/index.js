// Simple CRUD Operations Using HTTP
// All the following APIs to read and write data from a JSON file

const http = require('http');
const fs = require('fs');
const { resolve } = require('path');

const port = 3000;

function readJsonFile(path) {
    return new Promise((resolve, reject) => {
        let users = '';
        const readFileStream = fs.createReadStream(path);
        readFileStream.on('data', (chunk) => {
            users += chunk;
        });

        readFileStream.on('end', () => {
            return resolve(JSON.parse(users || '[]'));
        });
    });
}
const server = http.createServer((req, res, next) => {
    const { url, method } = req;
    console.log(url.split("/").filter(Boolean));
    const urlParts = url.split("/").filter(Boolean);

    // Q1- This is an API that adds a new user (ensuring that the email of the new user doesn’t exist before)
    if (url === "/addUsers" && method === "POST") {
        let data = "";
        req.on("data", (chunk) => {
            data += chunk;
        });

        req.on("end", async () => {
            let userData = JSON.parse(data);

            let users = await readJsonFile("./users.json");
            const userExists = users.find((user) => user.email === userData.email);

            if (userExists) {
                res.end("EORROR: 409 User already exists!");
            } else {
                users.push(userData);
                const writeFileStream = fs.createWriteStream("./users.json");
                writeFileStream.write(JSON.stringify(users));
                res.end(
                    JSON.stringify({ Message: "User added successfully!", Users: users })
                );
            }
        });
    }
    // Q2- API that updates an existing user's name, age, or email by their ID.
    // The user ID should be retrieved from the URL
    else if (
        urlParts[0] === "updateUser" &&
        !isNaN(urlParts[1]) &&
        method === "PATCH"
    ) {
        const id = parseInt(urlParts[1]);
        let data = "";
        req.on("data", (chunk) => {
            data += chunk;
        });
        req.on("end", async () => {
            let userData = JSON.parse(data);
            let users = await readJsonFile("./users.json");

            let userExists = false;
            users.forEach((user) => {
                if (user.id == id) {
                    user.name = userData.name || user.name;
                    user.email = userData.email || user.email;
                    user.age = userData.age || user.age;
                    userExists = true;
                }
            });

            if (userExists) {
                const writeFileStream = fs.createWriteStream("./users.json");
                writeFileStream.write(JSON.stringify(users));
                res.end(
                    JSON.stringify({
                        Message: "User updated successfully!",
                        User: userData,
                    })
                );
            } else {
                res.end("Error 404: User ID is not found!");
            }
        });
    }
    // Q3- API that deletes a User by ID.
    // The user id should be retrieved from the URL
    else if (
        urlParts[0] === "deleteUser" &&
        !isNaN(urlParts[1]) &&
        method === "DELETE"
    ) {
        let data = "";
        req.on("data", (chunk) => {
            data += chunk;
        });

        req.on("end", async () => {
            let users = await readJsonFile("./users.json");
            const id = parseInt(urlParts[1]);

            const userIdx = users.findIndex((user) => user.id == id);
            if (userIdx == -1) {
                res.end("ERROR: 404 User ID not found!");
            } else {
                users.splice(userIdx, 1);
                const writeFileStream = fs.createWriteStream("./users.json");
                writeFileStream.write(JSON.stringify(users));
                res.end(JSON.stringify({ Message: "User deleted successfully" }));
            }
        });
    }
    // Q4- an API that gets all users from the JSON file.
    else if (url === "/users" && method === "GET") {
        readJsonFile("./users.json").then((users) => {
            res.end(JSON.stringify(users));
        });
    }

    // Q5- API that gets User by ID.
    else if(
        urlParts[0] === "users" &&
        !isNaN(urlParts[1]) &&
        method === "GET"
    ){
        const id = parseInt(urlParts[1]);
        readJsonFile('./users.json').then((users) => {
            let userIdx = users.findIndex(user => user.id == id);
            if(userIdx != -1){
                res.end(JSON.stringify(users[userIdx]));
            } else{
                res.end("ERROR: 404 User ID not found!");
            }

        });
    }
    else{
        res.end("Invalid Request!");
    }
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);

});


