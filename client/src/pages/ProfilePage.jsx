import React, { useState } from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
	const navigate = useNavigate();
	const [selectedImage, setSelectedImage] = useState(null);
	const [name, setName] = useState("Sizan");
	const [bio, setBio] = useState("Bla bla bla bla bla...");

	const handleSubmit = async (e) => {
		e.preventDefault();
		navigate("/");
	};

	return (
		<div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center">
			<div className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg">
				{/* left */}
				<form
					onSubmit={(e) => {
						handleSubmit(e);
					}}
					className="flex flex-col gap-5 p-10 flex-1"
				>
					<h3 className="text-lg ">Profile details</h3>

					{/* image */}
					<label
						htmlFor="avatar"
						className="flex items-center gap-3 cursor-pointer"
					>
						<input
							onChange={(e) => {
								setSelectedImage(e.target.files[0]);
							}}
							type="file"
							id="avatar"
							accept=".png, .jpg, .jpeg"
							hidden
						/>
						<img
							src={
								selectedImage
									? URL.createObjectURL(selectedImage)
									: assets.avatar_icon
							}
							className={`w-12 h-12 ${
								selectedImage && "rounded-full"
							}`}
						/>
						Upload profile image
					</label>

					{/* name */}
					<input
						onChange={(e) => {
							setName(e.target.value);
						}}
						value={name}
						type="text"
						required
						placeholder="Your name"
						className="p-2 border border-gray-500 rounded-md"
					/>

					{/* bio */}
					<textarea
						onChange={(e) => {
							setBio(e.target.value);
						}}
						value={bio}
						placeholder="Write profile bio"
						required
						className="p-2 border border-gray-500 rounded-md "
						rows={4}
					></textarea>

					{/* button */}
					<button
						type="submit"
						className="bg-violet-500 text-white p-2 rounded-full text-lg cursor-pointer"
					>
						Save
					</button>
				</form>

				{/* right */}
				<img
					src={assets.logo_icon}
					className="max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10"
				/>
			</div>
		</div>
	);
};

export default ProfilePage;
