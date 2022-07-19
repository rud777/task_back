import nodemailer from 'nodemailer';

export const sendEmail = (email,password) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
      user: 'rud_torosyan@mail.ru',
      pass: 'PEZhZhcZwGkIyx5f0poB',
    },
  });

  const mailOptions = {
    from: '"Rudik Torosyan" <rud_torosyan@mail.ru>',
    email,
    subject: 'Admin-Reminder',
    html: `Login: ${email}
           Password: ${password}` ,
  };
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
    }
  });
};
