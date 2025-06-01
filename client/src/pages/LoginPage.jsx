import React, { useState } from "react";
import assets from "../assets/assets";

const LoginPage = () => {
	const [currState, setCurrState] = useState("Sign Up");
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [bio, setBio] = useState("");

	const [isDataSubmitted, setIsDataSubmitted] = useState(false);

	const onSubmitHandler = (e) => {
		e.preventDefault();
		if (currState === "Sign Up" && !isDataSubmitted) {
			setIsDataSubmitted(true);
			return;
		}
	};

	return (
		<div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
			{/* left */}
			<img src={assets.logo_big} className="w-[min(30vw, 250px)]" />

			{/* right */}
			<form
				onSubmit={(e) => {
					onSubmitHandler(e);
				}}
				className="border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg"
			>
				<h2 className="font-medium text-2xl flex justify-between items-center">
					{currState}
					{isDataSubmitted && (
						<img
							onClick={() => {
								setIsDataSubmitted(false);
							}}
							src={assets.arrow_icon}
							className="w-5 cursor-pointer"
						/>
					)}
				</h2>

				{currState === "Sign Up" && !isDataSubmitted && (
					<input
						value={fullName}
						onChange={(e) => {
							setFullName(e.target.value);
						}}
						type="text"
						placeholder="Full name"
						required
						className="p-2 border border-gray-500 rounded-md focus:outline-none"
					/>
				)}

				{!isDataSubmitted && (
					<>
						<input
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							type="email"
							placeholder="Email"
							required
							className="p-2 border border-gray-500 rounded-md "
						/>
						<input
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							type="password"
							placeholder="Password"
							required
							className="p-2 border border-gray-500 rounded-md "
						/>
					</>
				)}

				{currState === "Sign Up" && isDataSubmitted && (
					<>
						<textarea
							onChange={(e) => {
								setBio(e.target.value);
							}}
							value={bio}
							rows={4}
							className="p-2 border border-gray-500 rounded-md"
							placeholder="Providea a short bio"
							required
						></textarea>
					</>
				)}

				<button className="py-3 text-white bg-violet-500 rounded-md cursor-pointer">
					{currState === "Sign Up" ? "Create Account" : "Login"}
				</button>

				<div className="flex items-center gap-2 text-sm text-gray-300">
					<label htmlFor="condition">
						<input type="checkbox" id="condition" className="" /> I
						agree to the terms & conditions
					</label>
				</div>

				<div className="flex flex-col gap-2">
					{currState === "Sign Up" ? (
						<>
							<p className="text-sm text-gray-300">
								Already have an account?{" "}
								<span
									onClick={() => {
										setCurrState("Login");
										setIsDataSubmitted(false);
									}}
									className="font-medium text-violet-500 cursor-pointer"
								>
									Login here
								</span>
							</p>
						</>
					) : (
						<p className="text-sm text-gray-300">
							Create an account{" "}
							<span
								onClick={() => {
									setCurrState("Sign Up");
								}}
								className="font-medium text-violet-500 cursor-pointer"
							>
								Register
							</span>
						</p>
					)}
				</div>
			</form>
		</div>
	);
};

export default LoginPage;
