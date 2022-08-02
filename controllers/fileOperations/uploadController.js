const multer = require('multer');
const { v4: uuid4 } = require('uuid');
const File = require('../../models/file');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, callback) => callback(null, 'uploads/'),
    filename: (req, file, callback) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E5)}Upsurge${Math.round(Math.random() * 1E3)}${path.extname(file.originalname)}`;
        callback(null, uniqueName);
    }
});

const handleData = multer({storage, limits: {fileSize: 1000000 * 53}});
const uploads = handleData.single('myFile');

const fileController = {
    async upload(req, res) {
        uploads(req, res, async (error) => {
            if (!req.file) {
                return res.json({ error: "Empty File cannot be Processed" });
            }
            if (error) {
                return res.status(500).send({ error: error.message });
            }

            const fileName = req.file.filename;
            const filePath = req.file.path;
            const fileSize = req.file.size;

            const file = new File({
                fileName, filePath, fileSize, UUID: uuid4()
            })

            let saveFile, targetFile;
            try {
                saveFile = await file.save();
                targetFile = `${process.env.HOST}/files/${saveFile.UUID}`;
            } catch(error) {
                return res.status(500).json({ error: error.message });
            }

            return res.status(200).json({file: targetFile, size: Math.round(saveFile.fileSize / 1000)});
        })
    }
}

module.exports = fileController;
