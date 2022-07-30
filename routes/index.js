const express = require('express');
const { fileController, showFilesController, downloadController, sendEmailController } = require('../controllers');
const router = express.Router();

router.post('/api/files/upload', fileController.upload);
router.get('/files/:uuid', showFilesController.show);
router.get('/files/download/:uuid', downloadController.download);
router.post('/api/files/sendemail', sendEmailController.sendemail);

module.exports = router;
