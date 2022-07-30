const File = require('../../models/file');

const showFilesController = {
    async show(req, res) {
        let getFile;
        try {
            getFile = await File.findOne({UUID: req.params.uuid});
            if (!getFile) {
                return res.render('download', { error: "404 File Not Found" });
            }
            return res.render('download', {
                UUID: getFile.UUID, 
                fileName: getFile.fileName,
                fileSize: getFile.fileSize,
                downloadLink: `${process.env.HOST}/files/download/${getFile.UUID}`
            });
        } catch(error) {
            return res.render('download', { error: error.message });
        }
    }
}

module.exports = showFilesController;
