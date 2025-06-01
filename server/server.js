import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";

// create express app and http server
const app = express();
const server = http.createServer(app);

// middleware
app.use(express.json({ limit: "4mb" }));
app.use(cors());

// connect to DB
await connectDB();

app.use("/api/status", (req, res) => {
	res.send("Server running");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
	console.log("Server is running on port: ", PORT);
});
