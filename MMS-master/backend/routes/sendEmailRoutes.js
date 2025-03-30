const sendEmail = async (to, subject, html) => {
    const mailOptions = { from: process.env.EMAIL, to, subject, html };
  
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) reject(error);
        else resolve(info);
      });
    });
  };
  
  export default sendEmail;
  