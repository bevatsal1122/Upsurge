const nodemailer = require('nodemailer');

async function sendEmail ({from, to, subject, text, html}) {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_SERVER,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_AUTH_LOGIN,
            pass: process.env.SMTP_AUTH_PASS
        }
    });

    const emailStatus = await transporter.sendMail({
        from: `Upsurge <${from}>`, to, subject, text, html 
    });
}


module.exports = sendEmail;
