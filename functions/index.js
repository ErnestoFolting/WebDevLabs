/* eslint-disable no-tabs */
const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const sanitizeHtml = require("sanitize-html");

const rateLimit = {
  callLimitForOneIp: 7,
  timeInSeconds: 10,
  ipCache: new Map(),
};

exports.sendmail = functions.https.onRequest((req, res) => {
  const mail = functions.config().mail;
  let transporter = null;
  if (mail) {
    transporter = nodemailer.createTransport({
      host: functions.config().mail.host,
      port: functions.config().mail.port,
      secure: false, // true for 465, false for other ports
      auth: {
        user: functions.config().mail.login, // generated ethereal user
        pass: functions.config().mail.pass, // generated ethereal password
      },
    });
  } else {
    return res.status(500).json({code: "500",
      error: "Mail credentials are undefined"});
  }
  functions.logger.info("Hello logs!", {structuredData: true});
  console.log(req.body);
  console.log(Object.keys(req.body).length);
  const reqIp = req.headers["fastly-client-ip"];
  let ipUser = {};
  const currentDate = new Date();
  if (rateLimit.ipCache.get(reqIp) === undefined) {
    rateLimit.ipCache.set(reqIp, {reqCount: 1, time: currentDate});
  } else {
    ipUser = rateLimit.ipCache.get(reqIp);
    console.log("counts: " + ipUser.reqCount);
    console.log("time:"+ (currentDate - ipUser.time)/1000);
    if (
      ipUser.reqCount + 1 > rateLimit.callLimitForOneIp ||
		currentDate - ipUser.time <= rateLimit.timeInSeconds * 1000
    ) {
      return res.status(429).json({code: "429", error: "rate limit"});
    }
  }
  ipUser = rateLimit.ipCache.get(reqIp);
  ipUser.reqCount += 1;
  ipUser.time = new Date();
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({code: 400, error: "No message!"});
  }
  const lines = Object.entries(req.body)
      .map(([key, val]) => `<p><b>${key}: </b>${val}</p>`)
      .join("\n");
  const myHtml = sanitizeHtml(`<h1> Message from form: </h1>${lines}`);
  const mailOptions = {
    from: "Contact form",
    to: functions.config().mail.to,
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
