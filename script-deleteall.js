const connectDB = require('./config/database');
const File = require('./models/file');
const fs = require('fs');

connectDB();

async function deleteData() {
    const allFiles = await File.find();
    if (allFiles.length) {
        for (const removeFile of allFiles) {
            try {
                fs.unlinkSync(removeFile.filePath);
                await removeFile.remove();
                console.log(`File Deleted ${removeFile.fileName} ${removeFile.filePath}`);
            } catch(error) {
                console.log(`Error Occured ${removeFile.fileName} ${removeFile.filePath}`);
            }
        }
    }
    console.log("Operation Completed");
}

deleteData().then(process.exit);
