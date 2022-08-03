const connectDB = require('./config/database');
const File = require('./models/file');
const path = require('path');
const fs = require('fs');

connectDB();

async function deleteData() {
    const dateBefore = new Date(Date.now() - (24 * 60 * 60 * 1000));
    const expiredFiles = await File.find({createdAt: { $lt: dateBefore }});
    if (expiredFiles.length) {
        for (const removeFile of expiredFiles) {
            try {
                fs.unlinkSync(path.join(__dirname, removeFile.filePath));
                await removeFile.remove();
                console.log(`File Deleted ${removeFile.fileName}`);
            } catch(error) {
                console.log(`Error Occured ${removeFile.fileName} ${path.join(__dirname, removeFile.filePath)}`);
            }
        }
    }
    console.log("Operation Completed");
}

deleteData().then(process.exit);
