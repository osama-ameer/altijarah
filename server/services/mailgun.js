const template = require('../config/template');
const keys = require('../config/keys');

const { host, port, username, password } = keys.nodeMailer;

const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
  host: host,
  port: port,
  secure: true, // true for 465, false for other ports
  auth: {
    user: username, // generated ethereal user
    pass: password, // generated ethereal password
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});
exports.sendEmail = async (email, type, host2, data) => {
  try{
    const message = prepareTemplate(type, host2, data);
    let info = await transporter.sendMail({
      from: "MERN Store! <osamaameer@sparktechsolutions.org>", 
      to: email, 
      subject:  message.subject,
      text: message.text, 
    });
    return info;
  }catch(error){
    return error
  }
};

const prepareTemplate = (type, host, data) => {
  let message;

  switch (type) {
    case 'reset':
      message = template.resetEmail(host, data);
      break;

    case 'reset-confirmation':
      message = template.confirmResetPasswordEmail();
      break;

    case 'signup':
      message = template.signupEmail(data);
      break;

    case 'merchant-signup':
      message = template.merchantSignup(host, data);
      break;

    case 'merchant-welcome':
      message = template.merchantWelcome(data);
      break;

    case 'newsletter-subscription':
      message = template.newsletterSubscriptionEmail();
      break;

    case 'contact':
      message = template.contactEmail();
      break;

    case 'merchant-application':
      message = template.merchantApplicationEmail();
      break;

    case 'order-confirmation':
      message = template.orderConfirmationEmail(data);
      break;

    default:
      message = '';
  }

  return message;
};
