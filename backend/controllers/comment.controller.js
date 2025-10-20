import Comment from "../models/comment.model.js";

export const getComments = async (req, res) => {
  const cursor = Number(req.query.cursor) || 0;

  const LIMIT = 2;

  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate("user", "name img")
      .sort({ createdAt: -1 })
      .limit(LIMIT)
      .skip(cursor * LIMIT);

    const hasNextPage = comments.length === LIMIT;

    // await new Promise((resolve) => setTimeout(resolve, 2000));

    return res
      .status(200)
      .json({ comments, nextCursor: hasNextPage ? cursor + 1 : null });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addComment = async (req, res) => {
  const { desc } = req.body;
  if (!desc) {
    return res.status(400).json({ message: "desc is required." });
  }

  try {
    await Comment.create({
      user: req.userId,
      post: req.params.postId,
      desc,
    });

    return res.status(201).json({ message: "Comment has been created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateComment = async (req, res) => {
  const { desc } = req.body;
  if (!desc) {
    return res.status(400).json({ message: "desc is required." });
  }

  try {
    const comment = await Comment.findById(req.params.id);
    if (req.userId !== comment.user.toString()) {
      return res
        .status(403)
        .json({ message: "You can update only your comment" });
    }

    await Comment.findByIdAndUpdate(req.params.id, { desc }, { new: true });

    return res.status(200).json({ message: "Comment has been updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (req.userId !== comment.user.toString()) {
      return res
        .status(403)
        .json({ message: "You can delete only your comment" });
    }

    await Comment.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Comment has been deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const likeComment = async (req, res) => {
  try {
    const userId = req.userId;

    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const hasLiked = comment.likes.some((id) => id.toString() === userId);
    const hasDisliked = comment.dislikes.some((id) => id.toString() === userId);

    if (!hasLiked) {
      await Comment.findByIdAndUpdate(req.params.id, {
        $addToSet: { likes: userId },
        $inc: { likesCount: 1 },
      });

      // Remove dislike if present
      if (hasDisliked) {
        await Comment.findByIdAndUpdate(req.params.id, {
          $pull: { dislikes: userId },
          $inc: { dislikesCount: -1 },
        });
      }
    } else {
      await Comment.findByIdAndUpdate(req.params.id, {
        $pull: { likes: userId },
        $inc: { likesCount: -1 },
      });
    }

    res.status(200).json({
      message: !hasLiked
        ? "Comment has been liked"
        : "Comment like has been removed",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const dislikeComment = async (req, res) => {
  try {
    const userId = req.userId;

    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const hasLiked = comment.likes.some((id) => id.toString() === userId);
    const hasDisliked = comment.dislikes.some((id) => id.toString() === userId);

    if (!hasDisliked) {
      await Comment.findByIdAndUpdate(req.params.id, {
        $addToSet: { dislikes: userId },
        $inc: { dislikesCount: 1 },
      });

      // Remove like if present
      if (hasLiked) {
        await Comment.findByIdAndUpdate(req.params.id, {
          $pull: { likes: userId },
          $inc: { likesCount: -1 },
        });
      }
    } else {
      await Comment.findByIdAndUpdate(req.params.id, {
        $pull: { dislikes: userId },
        $inc: { dislikesCount: -1 },
      });
    }

    res.status(200).json({
      message: !hasDisliked
        ? "Comment has been disliked"
        : "Comment dislike has been removed",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
