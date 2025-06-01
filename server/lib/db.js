import mongoose, { mongo } from "mongoose";

export const connectDB = async () => {
	try {
		await mongoose.connect(`${process.env.MONGODB_URI}/chat-app`);
		console.log(
			"Mongoose connection state:",
			mongoose.connection.readyState
		);
	} catch (error) {
		console.log(error);
	}
};

// ✅ Optional: Check Mongoose Connection State
// You can log the current connection state (for debugging):
// console.log("Mongoose connection state:", mongoose.connection.readyState);

//     0: disconnected
//     1: connected
//     2: connecting
//     3: disconnecting
