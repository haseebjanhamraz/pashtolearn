import express from "express";
import prisma from "../utils/prisma.js"; // Prisma client
import bcrypt from "bcrypt";
import {
  authenticate,
  authorize,
  authorizeEmailVerified,
} from "../middlewares/auth.js";

const router = express.Router();

// Create User
router.post("/", async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    // check if email already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // create new user
    const user = await prisma.user.create({
      data: { fullName, email, password: hashedPassword },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    res.status(201).json(user);
  } catch (err) {
    console.error("❌ Error creating user:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all Users
router.get(
  "/",
  authenticate,
  authorize("admin"),
  authorizeEmailVerified,
  async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          fullName: true,
          email: true,
          role: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
      });
      res.json(users);
    } catch (err) {
      console.error("❌ Error fetching users:", err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

export default router;
