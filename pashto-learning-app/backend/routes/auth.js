import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../utils/db.js";

const router = express.Router();

// Helpers
const generateAccessToken = (user) =>
  jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "15m" });

const generateRefreshToken = (user) =>
  jwt.sign(user, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

// Register
router.post("/register", async (req, res) => {
  const { full_name, email, password, role } = req.body;
  try {
    const exists = await pool.query("SELECT id FROM users WHERE email=$1", [
      email,
    ]);
    if (exists.rows.length)
      return res.status(400).json({ error: "User already exists" });

    const hashed = await bcrypt.hash(password, 12);
    const result = await pool.query(
      "INSERT INTO users (full_name, email, password, role) VALUES ($1,$2,$3,$4) RETURNING id, full_name, email, role",
      [full_name, email, hashed, role || "student"]
    );

    res.status(201).json({ message: "User created", user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    if (!result.rows.length)
      return res.status(400).json({ error: "Invalid credentials" });

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });

    const userPayload = { id: user.id, email: user.email, role: user.role };
    const accessToken = generateAccessToken(userPayload);
    const refreshToken = generateRefreshToken(userPayload);

    await pool.query("UPDATE users SET refresh_token=$1 WHERE id=$2", [
      refreshToken,
      user.id,
    ]);

    res.json({ accessToken, refreshToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Refresh token
router.post("/refresh", async (req, res) => {
  const { token } = req.body;
  if (!token)
    return res.status(401).json({ error: "No refresh token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const result = await pool.query("SELECT * FROM users WHERE id=$1", [
      decoded.id,
    ]);
    if (!result.rows.length || result.rows[0].refresh_token !== token) {
      return res.status(403).json({ error: "Invalid refresh token" });
    }

    const userPayload = {
      id: result.rows[0].id,
      email: result.rows[0].email,
      role: result.rows[0].role,
    };
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
    await pool.query(
      "UPDATE users SET refresh_token=NULL WHERE refresh_token=$1",
      [token]
    );
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
