import Post from "../models/post.model.js";

export const getPosts = async (req, res) => {
  const category = req.query.category;

  try {
    let posts;

    if (category) {
      posts = await Post.find({ category }).sort({ createdAt: -1 }).limit(12);
    } else {
      posts = await Post.find().sort({ createdAt: -1 }).limit(12);
    }

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "user",
      "name image"
    );
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const { title, desc, img, category, isFeatured } = req.body;

  if (!title || !desc || !category || !isFeatured) {
    return res.status(400).json({
      message: "title, desc, img, category and isFeatured are required.",
    });
  }

  try {
    if (!req.isAdmin) {
      return res.status(403).json({ message: "Admin only" });
    }

    const existingTitle = await Post.findOne({ title });
    if (existingTitle) {
      return res.status(403).json({ message: "Title already exists" });
    }

    await Post.create({
      user: req.userId,
      title,
      desc,
      img,
      category,
      isFeatured: isFeatured === "true",
    });

    res.status(201).json({ message: "Post has been created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { title, desc, img, category, isFeatured } = req.body;

  if (!title || !desc || !category || !isFeatured) {
    return res.status(400).json({
      message: "title, desc, category and isFeatured are required.",
    });
  }

  try {
    if (!req.isAdmin) {
      return res.status(403).json({ message: "Admin only" });
    }

    const existingTitle = await Post.findOne({ title });
    if (existingTitle && existingTitle._id.toString() !== req.params.id) {
      return res.status(409).json({ message: "Title is already taken" });
    }

    await Post.findByIdAndUpdate(
      req.params.id,
      { title, desc, img, category, isFeatured: isFeatured === "true" },
      { new: true }
    );

    res.status(200).json({ message: "Post has been updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    if (!req.isAdmin) {
      return res.status(403).json({ message: "Admin only" });
    }

    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post has been deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFeaturedPosts = async (req, res) => {
  try {
    const posts = await Post.find({ isFeatured: true })
      .sort({ createdAt: -1 })
      .limit(3);

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPaginatedPosts = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const searchQuery = req.query.search || req.query.q;
  const category = req.query.category;
  const sort = req.query.sort;

  const ITEM_PER_PAGE = 12;

  try {
    const query = {};

    if (searchQuery) {
      query.title = { $regex: searchQuery, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    const sortOption =
      sort === "popular"
        ? { visit: -1 }
        : sort === "oldest"
        ? { createdAt: 1 }
        : { createdAt: -1 };

    const posts = await Post.find(query)
      .sort(sortOption)
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    const totalPosts = await Post.countDocuments(query);

    return res.status(200).json({ posts, totalPosts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const incrementVisit = async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, {
      $inc: { visit: 1 },
    });

    return res.status(200).json({ message: "View incremented" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRelatedPosts = async (req, res) => {
  const category = req.query.category;
  const postId = req.query.postId;

  try {
    const posts = await Post.find({ category, _id: { $ne: postId } })
      .sort({ createdAt: -1 })
      .limit(4);

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
