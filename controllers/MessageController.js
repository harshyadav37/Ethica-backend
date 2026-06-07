import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

export const createConversation = async (
  req,
  res
) => {
  try {
    const senderId = req.user.id;
    const { receiverId } = req.body;

    let conversation =
      await Conversation.findOne({
        participants: {
          $all: [senderId, receiverId],
        },
      });

    if (!conversation) {
      conversation =
        await Conversation.create({
          participants: [
            senderId,
            receiverId,
          ],
        });
    }

    res.status(200).json({
      success: true,
      conversation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const sendMessage = async (
  req,
  res
) => {
  try {
    const senderId = req.user.id;

    const {
      conversationId,
      receiverId,
      text,
    } = req.body;

    const message =
      await Message.create({
        conversationId,
        senderId,
        receiverId,
        text,
      });

    await Conversation.findByIdAndUpdate(
      conversationId,
      {
        lastMessage: text,
      }
    );

    res.status(201).json({
      success: true,
      message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMessages = async (
  req,
  res
) => {
  try {
    const { conversationId } =
      req.params;

    const messages =
      await Message.find({
        conversationId,
      }).sort({
        createdAt: 1,
      });

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getConversations =
  async (req, res) => {
    try {
      const conversations =
        await Conversation.find({
          participants: req.user.id,
        })
          .populate(
            "participants",
            "name username profilePicture"
          )
          .sort({
            updatedAt: -1,
          });

      res.status(200).json({
        success: true,
        conversations,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };