import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, name, password, img } = req.body;

  if (!username || !email || !name || !password) {
    return res
      .status(400)
      .json({ message: "username, email, name and password are required." });
  }

  try {
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(403).json({ message: "Username already exists" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(403).json({ message: "Email already exists" });
    }

    const existingName = await User.findOne({ name });
    if (existingName) {
      return res.status(403).json({ message: "Name already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      name,
      password: hashedPassword,
      img,
    });

    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    const { password: _, ...userWithoutPassword } = user._doc;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    const { password: _, ...userWithoutPassword } = user._doc;
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
