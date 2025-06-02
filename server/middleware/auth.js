// TO BE NOTED:
// MIDDLEWARES ARE THE FUNCTIONS THAT ARE EXECUTED BEFORE THE CONTROLLER FUNCTIONS ARE EXECUTED
// 2:48:38/5:59:37

import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
	try {
		const token = req.header.token;
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findById(decoded.userId).select("-password");
		if (!user) {
			return res.json({ success: false, message: "User not found!" });
		}

		req.user = user;
		next();
	} catch (error) {
		console.log("Error in auth.js middleware->protectRoute(): ", error);
		res.json({ success: false, message: error.message });
	}
};
