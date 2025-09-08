import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import prisma from "../utils/prisma.js";

// Generate verification token
export const generateVerificationToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.EMAIL_SECRET, {
    expiresIn: "1d",
  });
};

// Send verification email
export const sendVerificationEmail = async (user, token) => {
  const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

  const transporter = nodemailer.createTransport({
    service: "gmail", // or smtp config
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Pashto App Email Verification" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: "Verify your email",
    html: `
      <h2>Hello ${user.fullName},</h2>
      <p>Thanks for registering. Please verify your email by clicking below:</p>
      <a href="${verificationUrl}">Verify Email</a>
      <p>This link expires in 24 hours.</p>
    `,
  });
};

// Verify token route
export const verifyEmail = async (req, res) => {
  const { token } = req.query;
  if (!token) return res.status(400).json({ error: "Invalid token" });

  try {
    const decoded = jwt.verify(token, process.env.EMAIL_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) return res.status(404).json({ error: "User not found" });
    if (user.emailVerified)
      return res.json({ message: "Email already verified" });

    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: true, verificationToken: null },
    });

    res.json({ message: "Email verified successfully" });
  } catch (err) {
    res.status(400).json({ error: "Invalid or expired token" });
  }
};
