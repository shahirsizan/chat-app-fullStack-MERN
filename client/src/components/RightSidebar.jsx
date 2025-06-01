import React from "react";
import assets from "../assets/assets";

const RightSidebar = ({ selectedUser, setSelectedUser }) => {
	return (
		selectedUser && (
			<div
				className={`bg-[#8185B2]/10 text-white w-full relative overflow-y-scroll 
			${selectedUser ? "max-md:hidden" : ""}`}
			>
				<div className="pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto">
					<img
						src={selectedUser?.profilePic || assets.avatar_icon}
						className="w-20 aspect-square rounded-full"
					/>
					<h1 className="px-10 text-xl font-medium mx-auto flex items-center gap-2">
						<p className="w-2 h-2 rounded-full bg-green-500"></p>
						{selectedUser.fullName}
					</h1>
					<p className="px-10 mx-auto">{selectedUser.bio}</p>
				</div>
				{/* 1:24:40 porjonto korsi. ekhane theke sidebar e media show
				korar // functionality shuru korsilo. Ami skip korsi. Puro
				project complete hole eta dhorbo */}
				{/* <hr />
				<div>
				</div> */}
				{/* 1:28:00 e nicher logout button er kaj dhorsi */}
				<button className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-white bg-violet-600/40 text-sm font-light py-2 px-20 rounded-full cursor-pointer">
					Logout
				</button>
			</div>
		)
	);
};

export default RightSidebar;
