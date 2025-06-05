import cloudinary from "../lib/cloudinary.js";
import Message from "../models/Message.js";
import User from "../models/User.js";
import { io, userSocketMap } from "../server.js";

//  get all users except logged in user in sidebar
export const getUsersForSIdebar = async (req, res) => {
	try {
		const userId = req.user._id;
		// find all the contacts to be shown in the sidebar
		const filteredUsers = await User.find({ _id: { $ne: userId } }).select(
			"-password"
		);

		// unseen msg count
		const unseenMessages = {};
		const promises = filteredUsers.map(async (user) => {
			// Each iteration runs in parallel (non-blocking)
			const messages = await Message.find({
				senderId: user._id,
				receiverId: userId,
				seen: false,
			});

			if (messages.length > 0) {
				unseenMessages[user._id] = messages.length;
			}
		});

		// ⚠️ map returns an array of promises when you use async inside it.
		// So promises becomes an array like this:
		// [
		//   Promise { <pending> },  // async task for user1
		//   Promise { <pending> },  // async task for user2
		//   Promise { <pending> },  // etc.
		// ]
		// What await Promise.all(promises) Does It waits until all the async operations inside the map() are complete.
		// This avoids issues where the function returns before all the message queries finish.
		// It ensures that unseenMessages is fully populated before you send the response.

		// Wait for all DB calls to finish
		await Promise.all(promises);

		res.json({
			success: true,
			users: filteredUsers,
			unseenMessages: unseenMessages,
		});
	} catch (error) {
		console.log(
			"Error in messageController->getUsersForSIdebar(): ",
			error
		);
		res.json({ success: false, message: error.message });
	}
};

//  get all messages for selected contact
export const getMessages = async (req, res) => {
	try {
		const { id: selectedUserId } = req.params;
		const myId = req.user._id;

		const messages = await Message.find({
			$or: [
				{ senderId: myId, receiverId: selectedUserId },
				{ senderId: selectedUserId, receiverId: myId },
			],
		});

		// after retrieving the chat, mark the `unread` messages as `read`
		await Message.updateMany(
			{ senderId: selectedUserId, receiverId: myId },
			{ seen: true }
		);

		res.json({
			success: true,
			messages: messages,
		});
	} catch (error) {
		console.log("Error in messageController->getMessages(): ", error);
		res.json({ success: false, message: error.message });
	}
};

// nicher API er ki kaj bujhtesi na. uporer API tei to message seen kora hoise :(
//  mark messages as seen using message id
export const markMessageAsSeen = async (req, res) => {
	try {
		const { id } = req.params;

		await Message.findByIdAndUpdate(id, { seen: true });

		res.json({
			success: true,
		});
	} catch (error) {
		console.log("Error in messageController->markMessageAsSeen(): ", error);
		res.json({ success: false, message: error.message });
	}
};

// send message
export const sendMessage = async (req, res) => {
	try {
		const { text, image } = req.body;

		const receiverId = req.params.id;
		const senderId = req.user._id;

		// we'll get it from `cloudinary` response
		let imageUrl;

		if (image) {
			const uploadResponse = await cloudinary.uploader.upload(image);
			imageUrl = uploadResponse.secure_url;
		}

		const newMessage = await Message.create({
			senderId: senderId,
			receiverId: receiverId,
			text: text,
			image: imageUrl,
		});
		// Okay, enough for normal software applications.
		// But for realtime applications like this chat-app, not only store in DB
		// but also we need to display that message in the receivers end immediately.
		// Here comes Socket.io

		// emit the newMessage to the receivers socket
		const receiverSocketId = userSocketMap[receiverId];

		if (receiverSocketId) {
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		res.json({
			success: true,
			newMessage: newMessage,
		});
	} catch (error) {
		console.log("Error in messageController->sendMessage(): ", error);
		res.json({ success: false, message: error.message });
	}
};
