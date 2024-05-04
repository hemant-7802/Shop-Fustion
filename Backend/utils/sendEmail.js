import nodeMailer from "nodemailer"

const sendEmail = async (opt) => {
    const transporter = nodeMailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        service: process.env.SMPT_SERVICE,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASS
        },
    })

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: opt.email,
        subject: opt.subject,
        text: opt.message,
    }

    transporter.sendMail(mailOptions, (err, res) => {
        if (err) {
            console.log("Transporter error",err.message);
        }
    })
}

export default sendEmail