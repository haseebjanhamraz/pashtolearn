import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../utils/prisma.js";

const router = express.Router();

// Helpers
const generateAccessToken = (user) =>
  jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "15m" });

const generateRefreshToken = (user) =>
  jwt.sign(user, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

// Register
router.post("/register", async (req, res) => {
  const { fullName, email, password, role } = req.body;
  try {
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(400).json({ error: "User already exists" });

    const hashed = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashed,
        role: role || "student",
      },
      select: { id: true, fullName: true, email: true, role: true },
    });

    res.status(201).json({ message: "User created", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });

    const userPayload = { id: user.id, email: user.email, role: user.role };
    const accessToken = generateAccessToken(userPayload);
    const refreshToken = generateRefreshToken(userPayload);

    await prisma.user.update({
      where: { id: user.id },
      data: { refresh_token: refreshToken },
    });

    res.json({ accessToken, refreshToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Refresh
router.post("/refresh", async (req, res) => {
  const { token } = req.body;
  if (!token)
    return res.status(401).json({ error: "No refresh token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user || user.refresh_token !== token) {
      return res.status(403).json({ error: "Invalid refresh token" });
    }

    const userPayload = { id: user.id, email: user.email, role: user.role };
    const newAccessToken = generateAccessToken(userPayload);

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ error: "Invalid or expired refresh token" });
  }
});

// Logout
router.post("/logout", async (req, res) => {
  const { token } = req.body;
  try {
    await prisma.user.updateMany({
      where: { refresh_token: token },
      data: { refresh_token: null },
    });
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
