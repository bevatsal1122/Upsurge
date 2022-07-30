const fileController = require('./fileOperations/uploadController');
const showFilesController = require('./fileOperations/showFilesController');
const downloadController = require('./fileOperations/downloadController');
const sendEmailController = require('./sendEmailController');

module.exports = { fileController, showFilesController, downloadController, sendEmailController };
