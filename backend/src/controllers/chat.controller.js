import Message from "./message.models.js";

export const getChatHistory = async (req, res) => {
  const { userId, chatWithId } = req.query;

  try {
    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: chatWithId },
        { senderId: chatWithId, receiverId: userId },
      ],
    }).sort({ createdAt: -1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching chat history" });
  }
};

export const searchMessages = async (req, res) => {
  const { userId, keyword } = req.query;

  try {
    const messages = await Message.find({
      senderId: userId,
      text: { $regex: keyword, $options: "i" },
    });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error searching messages" });
  }
};
