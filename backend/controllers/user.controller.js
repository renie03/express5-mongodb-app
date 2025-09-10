import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const updateUser = async (req, res) => {
  const { username, email, name, password, img } = req.body;

  if (!username || !email || !name) {
    return res
      .status(400)
      .json({ message: "username, email and name are required." });
  }

  try {
    if (req.params.id !== req.userId) {
      return res
        .status(403)
        .json({ message: "You can update only your account" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername && existingUsername._id.toString() !== req.userId) {
      return res.status(409).json({ message: "Username is already taken" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail && existingEmail._id.toString() !== req.userId) {
      return res.status(409).json({ message: "Email is already taken" });
    }

    const existingName = await User.findOne({ name });
    if (existingName && existingName._id.toString() !== req.userId) {
      return res.status(409).json({ message: "Name is already taken" });
    }

    const updateFields = {
      username,
      email,
      name,
      img,
    };

    // Hash password if provided and not just whitespace
    if (password && password.trim() !== "") {
      updateFields.password = await bcrypt.hash(password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    const { password: _, ...userWithoutPassword } = updatedUser._doc;
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
