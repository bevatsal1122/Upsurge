const connectDB = require('./config/database');
const File = require('./models/file');
const path = require('path');
const fs = require('fs');

connectDB();

async function deleteData() {
    const allFiles = await File.find();
    if (allFiles.length) {
        for (const removeFile of allFiles) {
            try {
                fs.unlinkSync(path.join(__dirname, removeFile.filePath));
                await removeFile.remove();
                console.log(`File Deleted ${removeFile.fileName} ${removeFile.filePath}`);
            } catch(error) {
                console.log(`Error Occured ${removeFile.fileName} ${path.join(__dirname, removeFile.filePath)}`);
                console.log(error);
            }
        }
    }
    console.log("Operation Completed");
}

deleteData().then(process.exit);
