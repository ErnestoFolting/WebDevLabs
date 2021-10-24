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
  console.log(req.body);
  console.log(Object.keys(req.body).length);
  console.log(req.headers.origin);
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({code: 400, error: "No message!"});
  }
  const lines = Object.entries(req.body)
      .map(([key, val]) => `<p><b>${key}: </b>${val}</p>`)
      .join("\n");
  const myHtml = sanitizeHtml(`<h1> Message from form: </h1>${lines}`);
  const mailOptions = {
    from: "Contact form",
    to: "danilsmy.edu@gmail.com",
    subject: "Hey, nice form!!!",
    html: myHtml,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error("Error sending mail", error.message);
      return res.status(500).json({code: "500", error: error.message});
    } else {
      console.log("check status");
      return res.status(200).json({data: "ok"});
    }
  });
});
