const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const config = require("../config/index");

let nodeConfig = {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: config.smpt.smptm,
        pass: config.smpt.smptp,
    }
}

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
    theme: "default",
    product : {
        name: "Mailgen",
        link: 'https://mailgen.js/'
    }
})

exports.registerMail = async (req, res) => {
    const {userEmail, username, text, subject} = req.body;

    var email = {
        body : {
            name: username,
            intro : text || 'Chào mừng đến với X-Bike.',
        }
    }

    var emailBody = MailGenerator.generate(email);

    let message = {
        from : config.smpt.smptm,
        to: userEmail,
        subject : subject || "Đăng ký tài khoản thành công",
        html : emailBody
    }

    transporter.sendMail(message)
        .then(() => {
            return res.status(201).send({ msg: "Bạn sẽ nhận được email từ website của chúng tôi."})
        })
        .catch(error => res.status(500).send({ error }))

}