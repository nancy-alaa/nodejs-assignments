const { log } = require('console');
const path = require('path');
const fs = require('fs');
const EventEmitter = require('events');
const events = new EventEmitter();
const os = require("os");
const zlib = require("zlib");
const { pipeline } = require("stream");

// 1
function logCurrFilePathandDir(){
    console.log(`File: ${__filename}, Dir: ${__dirname}`);
    
}
logCurrFilePathandDir();
console.log('-'.repeat(30));
//--------------------------

// 2
function returnFileName(filePath){
    return path.basename(filePath);
}
console.log(returnFileName("/user/files/report.pdf"));
console.log('-'.repeat(30));
//--------------------------

// 3
function buildPath(obj){
    return path.format(obj);
}

console.log(buildPath({ dir: "/folder", name: "app", ext: ".js" }));
console.log('-'.repeat(30));
//--------------------------

// 4
function returnExtension(filePath){
    return path.extname(filePath);
}
console.log(returnExtension("/docs/readme.md"));
console.log('-'.repeat(30));
//--------------------------

// 5
function parseFileNameandExtension(filePath){
    const parsed = path.parse(filePath);
    return {Name: parsed.name, Extension: parsed.ext};
}
console.log(parseFileNameandExtension("/home/app/main.js"));
console.log('-'.repeat(30));
//--------------------------


// 6
function isAbsolutePath(filePath){
    return path.isAbsolute(filePath);
}
console.log(isAbsolutePath("/home/user/file.txt"));
console.log('-'.repeat(30));
//--------------------------

// 7
function joinSegments(...segments){
    return path.join(...segments);
}
console.log(joinSegments("src", "components", "App.js"));
console.log('-'.repeat(30));
//--------------------------

// 8
function resolveToAbsolutePath(relativePath){
    return path.resolve(relativePath);
}
console.log(resolveToAbsolutePath("./index.js"));
console.log('-'.repeat(30));
//--------------------------

// 9
function joinPaths(...paths){
    return path.join(...paths);
}
console.log(joinPaths("/folder1", "folder2/file.txt"));
console.log('-'.repeat(30));
//--------------------------

// 10
function deleteFileAsync(filePath){
    fs.unlink(filePath, (err) => {
        if(err){
            console.error(`Error deleting file: ${err.message}`);
        } else{
            console.log(`${filePath} is deleted.`);
        }
        
    });
    
    
}
//deleteFileAsync("file.txt");
console.log('-'.repeat(30));
//--------------------------

// 11
function createFolderSync(folderPath){
    try{
        fs.mkdirSync(folderPath, { recursive: true });
        console.log('success');
        
    } catch (err) {
        console.error(`Error creating folder: ${err.message}`);
    }
}
createFolderSync("newFolder/subFolder");
console.log('-'.repeat(30));
//--------------------------

// 12
events.on('start', () => {
    console.log("Welcome event triggered!");
    
});
events.emit('start');
console.log('-'.repeat(30));
//--------------------------

// 13
events.on('login', (username) => {
    console.log(`User logged in: ${username}`);
    
});
events.emit('login', 'Ahmed');
console.log('-'.repeat(30));
//--------------------------

// 14
function readSync(filePath){
    try {
        const content = fs.readFileSync("notes.txt", "utf8");
        console.log(content);
    } catch (err) {
        console.error(`Error reading file: ${err.message}`);
    }
}
readSync("notes.txt");
console.log("-".repeat(30));
//--------------------------

// 15
function writeToFile(filePath, content){
    fs.writeFile(filePath, content, (err) => {
        if(err){
            console.error(`Error writing to file: ${err.message}`);
        } else {
            console.log(`Content written to ${filePath}`);
        }
    });
}
writeToFile("./async.txt", "Async save");
console.log("-".repeat(30));
//--------------------------

// 16
function dirExist(path){
    return fs.existsSync(path);
}
console.log(dirExist("./notes.txt"));
console.log("-".repeat(30));
//--------------------------

// 17
function getOSInfo(){
    return {
        Platform: os.platform(), Arch: os.arch()
    }
}
console.log(getOSInfo());
console.log("-".repeat(30));
//--------------------------

// 18
function readFileInChuncks(filePath){
    const stream = fs.ReadStream(filePath, { encoding: 'utf8' });
    stream.on('data', (chunck) => {
        console.log(chunck);
    });
}
readFileInChuncks("big.txt");
console.log("-".repeat(30));
//--------------------------

// 19
function copyStream(source, destination){
    const readstream = fs.createReadStream(source);
    const writestream = fs.createWriteStream(destination);
    readstream.pipe(writestream);
    writestream.on('finish', () => {
        console.log(`File copied using streams`);
    });
}
copyStream("source.txt", "destination.txt");
console.log("-".repeat(30));
//--------------------------

// 20
function compressFile(input, output) {
    pipeline(
        fs.createReadStream(input),
        zlib.createGzip(),
        fs.createWriteStream(output),
        (err) => {
            if (err) throw err;
            console.log("Compression completed!");
        }
    );
}

compressFile("source.txt", "source.txt.gz");
console.log("-".repeat(30));