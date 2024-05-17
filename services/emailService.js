const User = require("../models/User");
const transporter = require("../config/email");

exports.sendEmails = async (listId, emailBody) => {
  const users = await User.find({ listId, subscribed: true });
  const emailPromises = users.map((user) => {
    let personalizedBody = emailBody;
    for (let [key, value] of user.properties.entries()) {
      personalizedBody = personalizedBody.replace(`[${key}]`, value);
    }
    return transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Your Subject Here",
      text: personalizedBody,
      html: personalizedBody,
    });
  });

  await Promise.all(emailPromises);

  return { message: "Emails sent successfully" };
};
