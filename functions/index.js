const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const sanitizeHtml = require("sanitize-html");

const rateLimit = {
  callLimitForOneIp: 3,
  seconds: 5,
  ipCache: new Map(),
};
console.log(functions.config());
const credentials = functions.config().mail;
let transporter = null;

if (credentials) {
  transporter = nodemailer.createTransport({
    host: credentials.host,
    port: credentials.port,
    secure: false, // true for 465, false for other ports
    auth: {
      user: credentials.login, // generated ethereal user
      pass: credentials.pass, // generated ethereal password
    },
  });
}

exports.sendmail = functions.https.onRequest((req, res) => {
  if (!credentials) {
    return res.status(500).json({code: "500", error: "Credentials are null"});
  }
  const reqIp = req.headers["fastly-client-ip"];

  const currentDate = new Date();

  const ipUser = rateLimit.ipCache.get(reqIp) ?? {
    reqCount: 0,
    time: currentDate - rateLimit.seconds * 1000,
  };
  if (
    ipUser.reqCount + 1 > rateLimit.callLimitForOneIp ||
    currentDate - ipUser.time < rateLimit.seconds * 1000
  ) {
    return res.status(429).json({code: "429", error: "rate limit"});
  }
  ipUser.reqCount++;
  ipUser.time = new Date();
  rateLimit.ipCache.set(reqIp, ipUser);

  const obj = Object.keys(req.body ?? {});
  if (!obj.length) {
    return res.status(400).json({code: 400, error: "No message!"});
  }
  const lines = Object.entries(req.body)
      .map(([key, val]) => `<p><b>${key}: </b>${val}</p>`)
      .join("\n");
  const myHtml = sanitizeHtml(`<h1> Message from form: </h1>${lines}`);
  const mailOptions = {
    from: "Contact form",
    to: credentials.to,
    subject: "Hey, nice form!!!",
    html: myHtml,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      functions.logger.error("Error sending mail", error.message);
      return res.status(500).json({code: "500", error: error.message});
    } else {
      functions.logger.log("check status");
      return res.status(200).json({data: "ok"});
    }
  });
});
