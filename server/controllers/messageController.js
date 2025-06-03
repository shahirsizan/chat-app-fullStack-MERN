import Message from "../models/Message.js";
import User from "../models/User.js";

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
