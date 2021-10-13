const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const sanitizeHtml = require("sanitize-html");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "avakovkakarsen@gmail.com", // generated ethereal user
    pass: "shJvg-bdh-2237hdj", // generated ethereal password
  },
});

exports.sendmail = functions.https.onRequest((req, res) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  if (!Object.keys(req.body.data).length) {
    return res.status(400).json({code: "400", error: "no data passed to api"});
  }

  const lines = Object.entries(req.body.data)
      .map(([key, val]) => "<p><b>${key}: </b>${val}</p>")
      .join("\n");

  const html = sanitizeHtml("<h1> Message from form: </h1>${lines}");

  const mailOptions = {
    from: "Contact form",
    to: "avakovkakarsen@gmail.com",
    subject: "Hi, nice form!!!",
    html: html,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error("Error sending mail", error.message);
      return res.status(500).json({code: "500", eror: error.message});
    }
    return res.status(200).json({data: "ok"});
  });
});
