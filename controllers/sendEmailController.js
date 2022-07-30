const Joi = require('joi');
const File = require('../models/file');
const sendEmail = require('../services/emailWorking');

const sendEmailController = {
    async sendemail(req, res) {
        const sendEmailFormat = Joi.object({
            UUID: Joi.string().required(),
            emailHost: Joi.string().email().min(4).max(30).required(),
            emailAcceptor: Joi.string().email().min(4).max(30).required(),
        });

        const { error } = sendEmailFormat.validate(req.body);

        if (error) {
            return res.status(422).send({error: error.message});
        }

        const { UUID, emailHost, emailAcceptor } = req.body;    
        let fileData;
        try {
            fileData = await File.findOne({UUID: UUID});
            if (!fileData) {
                return res.status(404).send({error: "404 File Not Found"});
            }
            fileData.senderEmail = emailHost;
            fileData.receiverEmail =  emailAcceptor;
            const updateEmail = await fileData.save();
        } catch(error) {
            return res.status(500).send({error: "Internal Server Error"});
        }
        sendEmail({
            from: emailHost,
            to: emailAcceptor,
            subject: 'File Shared | Download Resource | Upsurge',
            text: `${emailHost} shared a File with you.`,
            html: require('../templates/emailFormat')({
                emailFrom: emailHost,
                emailTo: emailAcceptor,
                downloadLink: `${process.env.HOST}/files/${fileData.UUID}`,
                size: parseInt(fileData.fileSize/1000),
                expiry: '48 hours'
            })
        });
        return res.json({emailStatus: "Email Sent Successfully", code: true});
    }
}

module.exports = sendEmailController;
