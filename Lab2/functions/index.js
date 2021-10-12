const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: testAccount.user, // generated ethereal user
    pass: '89djJffK-fk4Kl-Kkfk', // generated ethereal password
  },
});