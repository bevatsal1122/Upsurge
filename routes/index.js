const express = require('express');
const { uploadController, showFilesController, downloadController, sendEmailController } = require('../controllers');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home');
})

router.post('/api/files/upload', uploadController.upload);
router.get('/files/:uuid', showFilesController.show);
router.get('/files/download/:uuid', downloadController.download);
router.post('/api/files/sendemail', sendEmailController.sendemail);

module.exports = router;
