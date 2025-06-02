import { generateToken } from "../lib/utils";
import User from "../models/User";
import bcrypt from "bcryptjs";

// signup
export const signup = async (req, res) => {
	const { fullName, email, password, bio } = req.body;

	try {
		if (!fullName || !email || !password || !bio) {
			return res.json({ success: false, message: "Missing details" });
		}

		const userExists = await User.findOne({ email });

		if (userExists) {
			return res.json({
				success: false,
				message: "Account already exists",
			});
		}

		const salt = await bcrypt.genSalt(5);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = await User.create({
			fullName,
			email,
			password: hashedPassword,
			bio,
		});

		// after creating user in DB, generate a token to be sent back to user. Use `_id` as payload for the token generation mechanism
		const token = generateToken(newUser._id);

		res.json({
			success: true,
			userData: newUser,
			token,
			message: "Account created successfully",
		});
	} catch (error) {
		console.log("Error in userController->signup(): ", error);
		res.json({ success: false, message: error.message });
	}
};

// login
export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const userData = await User.findOne({ email: email });
		const isPassCorrect = await bcrypt.compare(password, userData.password);

		if (!sPassCorrect) {
			return res.json({ success: false, message: "Invalid credentials" });
		}

		// email & password okay till this point. So generate token and send to user
		// Use `_id` as payload for the token generation mechanism
		const token = generateToken(userData._id);

		res.json({
			success: true,
			userData: userData,
			token,
			message: "Logged in successfully",
		});
	} catch (error) {
		console.log("Error in userController->login(): ", error);
		res.json({ success: false, message: error.message });
	}
};
