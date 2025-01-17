import nodemailer from "nodemailer";

const sendEmail = async ( to, subject, text ) => {
  
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail", // or your preferred email provider
      auth: {
        user: process.env.EMAIL_ADDRESS, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email password
      },
    });

    // Sending the email
    await transporter.sendMail({
      from: process.env.EMAIL_ADDRESS,
      to,
      subject,
      text,
    });

    // console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error("Failed to send email");
  }
};

export default sendEmail;
