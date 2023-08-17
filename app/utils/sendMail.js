const nodemailer = require("nodemailer");

async function sendEmail(recipient, subject, message) {
  // Создаем транспорт для отправки письма
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_SEND_EMAIL,
      pass: process.env.GOOGLE_SEND_PASS,
    },
  });

  // Определяем содержимое письма
  const mailOptions = {
    from: "your_email@gmail.com",
    to: recipient,
    subject: subject,
    text: message,
  };

  // Отправляем письмо
  await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;
