import { generateToken } from "../lib/utils";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

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

// check whether user is authenticated
export const checkAuth = (req, res) => {
	res.json({ success: true, user: req.user });
};

// update user profile details
export const updateProfile = async (req, res) => {
	try {
		const { profilePic, bio, fullName } = req.body;
		const userId = req.user._id;
		let updatedUser;

		if (!profilePic) {
			updatedUser = await User.findByIdAndUpdate(
				userId,
				{
					bio: bio,
					fullName: fullName,
				},
				{ returnDocument: "after" }
				// could have also used {new : true}
			);
		} else {
			//  if profilePic is in the req body, we have to upload into cloudinary
			const upload = await cloudinary.uploader.upload(profilePic);
			updatedUser = await User.findByIdAndUpdate(
				userId,
				{
					profilePic: upload.secure_url,
					bio: bio,
					fullName: fullName,
				},
				{ returnDocument: "after" }
			);
		}

		res.json({ success: true, user: updatedUser });
	} catch (error) {
		console.log("Error in userController->updateProfile(): ", error);
		res.json({ success: false, message: error.message });
	}
};
