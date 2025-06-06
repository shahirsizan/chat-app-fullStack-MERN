import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";

// create express app and http server
const app = express();
const server = http.createServer(app);

// Initialize socket.io server
export const io = new Server(server, {
	cors: { origin: "*" },
});

// Store online users
export const userSocketMap = {}; // format -> {userId : socketId}

// socket.io connection handler
io.on("connection", (socket) => {
	// when one of the friends becomes online
	const userId = socket.handshake.query.userId;
	if (userId) {
		console.log("User connected: ", userId);
		userSocketMap[userId] = socket.id;
	}

	// emit online users to all connected users
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	socket.on("disconnect", () => {
		console.log("User disconnected: ", userId);
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

// middleware
app.use(express.json({ limit: "4mb" }));
app.use(cors());

// connect to DB
await connectDB();

// Routes setup
app.use("/api/status", (req, res) => {
	res.send("Server running");
});
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

// Port setup
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
	console.log("Server is running on port: ", PORT);
});
