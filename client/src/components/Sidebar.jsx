import React from "react";
import assets, { userDummyData } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ selectedUser, setSelectedUser }) => {
	const navigate = useNavigate();

	return (
		<div
			className={`h-full p-5 rounded-xl overflow-y-scroll text-white bg-gray-100/10 ${
				selectedUser ? " max-md:hidden" : ""
			}`}
		>
			{/* logo, menu, search */}
			<div className="pb-5">
				{/* logo & menu */}
				<div className="flex justify-between items-center">
					<img src={assets.logo} className="max-w-40" />
					<div className="relative py-2 group">
						<img
							src={assets.menu_icon}
							className="max-h-5 cursor-pointer"
						/>

						{/* hidden menu box */}
						<div className="hidden group-hover:block absolute top-full right-0 z-10 w-32 p-5 rounded-md bg-[#282142] border border-gray-600 text-gray-100 ">
							<p
								onClick={() => {
									navigate("/profile");
								}}
								className="cursor-pointer text-sm "
							>
								Edit Profile
							</p>
							<hr className="my-2 border-t border-gray-500" />
							<p
								onClick={() => {
									navigate("/profile");
								}}
								className="cursor-pointer text-sm"
							>
								Logout
							</p>
						</div>
					</div>
				</div>

				{/* search */}
				<div className="rounded-full flex items-center gap-2 py-3 px-4 mt-5">
					<img src={assets.search_icon} className="w-3" />
					<input
						type="text"
						className="text-white text-xs flex-1"
						placeholder="Search User..."
					/>
				</div>
			</div>

			{/* chat list */}
			<div className="flex flex-col">
				{userDummyData.map((user, idx) => {
					return (
						<div
							key={idx}
							onClick={() => {
								setSelectedUser(user);
							}}
							className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm
								${selectedUser?._id === user._id && "bg-[#282142]/50"}`}
						>
							<img
								src={user?.profilePic || assets.avatar_icon}
								className="w-[35px] aspect-square rounded-full"
							/>

							<div className="flex flex-col">
								<p>{user.fullName}</p>
								{idx < 3 ? (
									<span className="text-xs">Online</span>
								) : (
									<span className="text-xs">Offline</span>
								)}
							</div>

							{idx > 2 && (
								<p className="absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50">
									{idx}
								</p>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Sidebar;
