import React, { useEffect, useRef, useState } from "react";
import assets, { messagesDummyData } from "../assets/assets";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = ({ selectedUser, setSelectedUser }) => {
	const bottomRef = useRef(null);
	// const [loading, setLoading] = useState(true);
	console.log("bottomRef outside useEffect: ", bottomRef);

	useEffect(() => {
		console.log("bottomRef in useEffect: ", bottomRef);
		if (bottomRef?.current) {
			bottomRef.current.scrollIntoView({ behavior: "smooth" });
		}
	});

	return selectedUser ? (
		// chat selected
		<div className="w-full overflow-scroll relative backdrop-blur-lg">
			{/* Header */}
			<div className=" flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
				<img src={assets.profile_martin} className="w-8 rounded-full" />
				<p className="flex flex-1 text-lg text-white items-center gap-2">
					Shahir Adil Sizan
					<span className="w-2 h-2 rounded-full bg-green-500"></span>
				</p>
				<img
					onClick={() => {
						setSelectedUser(null);
					}}
					src={assets.arrow_icon}
					className="md:hidden max-w-7"
				/>
				<img src={assets.help_icon} className="max-md:hidden max-w-5" />
			</div>

			{/* chat area */}
			<div className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6">
				{messagesDummyData.map((message, idx) => {
					return (
						<div
							key={idx}
							className={`flex items-end gap-2 justify-end ${
								message.senderId !==
									"680f50e4f10f3cd28382ecf9" &&
								"flex-row-reverse"
							}`}
						>
							{/* {
								"_id": "680f571ff10f3cd28382f094",
								"senderId": "680f5116f10f3cd28382ed02",
								"receiverId": "680f50e4f10f3cd28382ecf9",
								"text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
								"seen": true,
								"createdAt": "2025-04-28T10:23:27.844Z",
							}*/}
							{message.image ? (
								<img
									src={message.image}
									className="max-w-[230px] rounded-lg overflow-hidden mb-8"
								/>
							) : (
								<p
									className={`p-2 max-w-[200px] md:text-sm rounded-lg mb-8 break-all bg-violet-500/30 text-white
										${
											message.senderId ===
											"680f50e4f10f3cd28382ecf9"
												? "rounded-br-none"
												: "rounded-bl-none"
										}`}
								>
									{message.text}
								</p>
							)}

							<div className="text-center text-xs">
								<img
									src={
										message.senderId ===
										"680f50e4f10f3cd28382ecf9"
											? assets.avatar_icon
											: assets.profile_martin
									}
									className="w-7 rounded-full"
								/>
								<p className="text-gray-500">
									{formatMessageTime(message.createdAt)}
								</p>
							</div>
						</div>
					);
				})}
				{/* chat e dhokar por nicher div e scroll korar jonno reference */}
				<div ref={bottomRef}></div>
			</div>

			{/* bottom text area */}
			<div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3">
				{/* upore `absolute bottom-0 left-0 right-0` na dileo hoito */}
				<div className="flex-1 flex items-center bg-gray-100/12 px-3 py-2 rounded-full">
					<input
						type="text"
						placeholder="Send a message"
						className="flex-1 text-sm border-none rounded-lg outline-none text-white placeholder-gray-400"
					/>

					<input
						type="file"
						id="image"
						accept="image/ong, image/jpeg"
						hidden
					/>
					<label htmlFor="image">
						<img
							src={assets.gallery_icon}
							className="w-5 mr-2 cursor-pointer"
						/>
					</label>
				</div>

				<img src={assets.send_button} className="w-7 cursor-pointer" />
			</div>
		</div>
	) : (
		// chat not selected
		<div className="flex flex-col items-center justify-center gap-2 max-md:hidden">
			<img src={assets.logo_icon} className="max-w-16" />
			<p className="text-white">Chat anytime anywhere</p>
		</div>
	);
};

export default ChatContainer;
