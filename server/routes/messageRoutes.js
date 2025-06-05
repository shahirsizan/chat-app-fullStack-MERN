import express from "express";
import { protectRoute } from "../middleware/auth.js";
import {
	getMessages,
	getUsersForSIdebar,
	markMessageAsSeen,
} from "../controllers/messageController.js";

const messageRouter = express.Router();

messageRouter.get("/users", protectRoute, getUsersForSIdebar);
messageRouter.get("/:id", protectRoute, getMessages);
messageRouter.put("mark/:id", protectRoute, markMessageAsSeen);

export default messageRouter;
