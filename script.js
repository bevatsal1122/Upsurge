const connectDB = require('./config/database');
const File = require('./models/file');
const fs = require('fs');

connectDB();

async function deleteData() {
    const dateBefore = new Date(Date.now() - (48* 60 * 60 * 1000));
    const expiredFiles = await File.find({createdAt: { $lt: dateBefore }});
    if (expiredFiles.length) {
        for (const removeFile of expiredFiles) {
            try {
                fs.unlinkSync(removeFile.filePath);
                await removeFile.remove();
                console.log(`File Deleted ${removeFile.fileName}`);
            } catch(error) {
                console.log(`Error Occured ${removeFile.fileName}`);
            }
        }
        console.log("Operation Successfully Completed");
    }
    console.log("Operation Successfully Completed");
}

deleteData().then(process.exit);
