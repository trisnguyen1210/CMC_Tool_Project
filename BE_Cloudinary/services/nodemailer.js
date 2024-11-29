import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//     host: 'mail.api-connect.io',
//     port: 587,
//     secure: false,
//     auth: {
//         user: "servicecenter@api-connect.io",
//         pass: 'Cmc123!@'
//     },
//     tls: {
//         rejectUnauthorized: false
//     },
//     logger: false,
//     transactionLog: false, // include SMTP traffic in the logs
//     allowInternalNetworkInterfaces: false
// });


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: "voice.alert.cmc@gmail.com",
        pass: 'awaxzcszhmlhftzx'
    },
    tls: {
        rejectUnauthorized: false
    },
    logger: false,
    transactionLog: false, // include SMTP traffic in the logs
    allowInternalNetworkInterfaces: false
});


export async function sendAlertEmail(receiver, subject, contentHeader, content) {
    try {
        const info = await transporter.sendMail({
            from: "servicecenter@mail.api-connect.io",
            to: `${receiver}`,
            // "tri.nvm@cmctelecom.vn"
            subject: `${subject}`,
            text: "Hello",
            html: `<b>${contentHeader}${content}</b>`
        })
        console.log("Message send: ", info.messageId)
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}