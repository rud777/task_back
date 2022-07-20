import nodemailer from 'nodemailer';

export const sendEmail = (to,password) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
      user: 'rud_torosyan@mail.ru',
      pass: 'gEGjpvyjd7RUPK2sZGUV',
    },
  });

  const mailOptions = {
    from: '"Rudik Torosyan" <rud_torosyan@mail.ru>',
    to,
    subject: 'Admin-Reminder',
    html: `Login: ${to}
           Password: ${password}` ,
  };
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
    }
  });
};
