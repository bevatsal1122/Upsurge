const File = require('../../models/file');

const downloadController = {
    async download(req, res) {
        let getFile;
        try {
            getFile = await File.findOne({UUID: req.params.uuid});
            if (!getFile) {
                return res.render('download', { error: "404 File Not Found / Link Expired" });
            }
            const filePath = getFile.filePath;
            return res.download(filePath);
        } catch(error) {
            return res.render('download', { error: error.message });
        }
    }
}

module.exports = downloadController;
