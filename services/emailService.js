const nodemailer = require("nodemailer");
const User = require("../models/User");

exports.sendEmails = async (listId, emailBody) => {
  const users = await User.find({ listId, subscribed: true });

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });

  const emailPromises = users.map((user) => {
    let personalizedBody = emailBody.replace("[name]", user.name)
                                    .replace("[email]", user.email)
                                    .replace("[city]", user.properties.get('city'));

    return transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Welcome to MathonGo!",
      text: personalizedBody,
      html: personalizedBody.replace(/\n/g, '<br>'), 
    })
    .then(() => {
      return {
        name: user.name,
        email: user.email,
        city: user.properties.get('city'),
        status: "Email sent successfully"
      };
    })
    .catch((error) => {
      return {
        name: user.name,
        email: user.email,
        city: user.properties.get('city'),
        status: "Failed to send email"
      };
    });
  });

  const results = await Promise.all(emailPromises);

  return results;
};
