import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import bcrypt from "bcryptjs";

export const getPaginatedUsers = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const search = req.query.search;

  const ITEM_PER_PAGE = 12;

  try {
    if (!req.isAdmin) {
      return res.status(403).json({ message: "Admin only" });
    }

    const query = { _id: { $ne: req.userId } };

    if (search) {
      query.username = { $regex: search, $options: "i" };
    }

    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    const totalUsers = await User.countDocuments(query);

    return res.status(200).json({ users, totalUsers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { username, email, name, password, img, isAdmin } = req.body;

  if (!username || !email || !name || !password || !isAdmin) {
    return res.status(400).json({
      message: "username, email, name, password and isAdmin are required.",
    });
  }

  try {
    if (!req.isAdmin) {
      return res.status(403).json({ message: "Admin only" });
    }

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

    await User.create({
      username,
      email,
      name,
      password: hashedPassword,
      img,
      isAdmin: isAdmin === "true",
    });

    res.status(201).json({ message: "User has been created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

export const updateUserAdmin = async (req, res) => {
  const { username, email, name, password, img, isAdmin } = req.body;

  if (!username || !email || !name || !isAdmin) {
    return res
      .status(400)
      .json({ message: "username, email, name and isAdmin are required." });
  }

  try {
    if (!req.isAdmin) {
      return res.status(403).json({ message: "Admin only" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername && existingUsername._id.toString() !== req.params.id) {
      return res.status(409).json({ message: "Username is already taken" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail && existingEmail._id.toString() !== req.params.id) {
      return res.status(409).json({ message: "Email is already taken" });
    }

    const existingName = await User.findOne({ name });
    if (existingName && existingName._id.toString() !== req.params.id) {
      return res.status(409).json({ message: "Name is already taken" });
    }

    const updateFields = {
      username,
      email,
      name,
      img,
      isAdmin: isAdmin === "true",
    };

    // Hash password if provided and not just whitespace
    if (password && password.trim() !== "") {
      updateFields.password = await bcrypt.hash(password, 10);
    }

    await User.findByIdAndUpdate(req.params.id, updateFields, { new: true });

    res.status(200).json({ message: "User has been updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    if (!req.isAdmin) {
      return res.status(403).json({ message: "Admin only" });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete all posts and comments linked to this user
    await Post.deleteMany({ user: req.params.id });
    await Comment.deleteMany({ user: req.params.id });

    res.status(200).json({ message: "User has been deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
