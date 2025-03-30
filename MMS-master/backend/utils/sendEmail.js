// sendEmail.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASSWORD },
});

const sendEmail = (to, subject, html) => {
  const mailOptions = { from: process.env.EMAIL, to, subject, html };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.log("Email error:", error);
    else console.log("Email sent:", info.response);
  });
};

export const sendTeamRegisterEmail = (to, teamId) => {
  sendEmail(to, "Team Registration Successful", `<p>Click below to join your team:</p>
              <a href="http://localhost:5173/teams/join/${teamId}" style="padding:10px 20px; background-color:#007bff; color:white; text-decoration:none; border-radius:5px;">Join Team</a>`);
};

export const sendTeamJoinEmail = (to, teamId) => {
  sendEmail(to, "Join Your Team", `<p>You have been invited to join a team.</p>
                <a href="http://localhost:5173/team/${teamId}" style="padding:10px 20px; background-color:#007bff; color:white; text-decoration:none; border-radius:5px;">Join Team</a>`);
};

export default sendEmail;