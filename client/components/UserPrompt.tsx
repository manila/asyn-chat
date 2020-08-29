import React from "react";
import "./UserPrompt.scss";

const UserPrompt = (props: any) => {
	let username = "";

	const updateUsername = (event: any) => {
		username = event.target.value;
	};

	return (
		<div id={"user-prompt"}>
			<input
				type={"text"}
				id={"username-input"}
				placeholder={"enter a username"}
				onChange={updateUsername}
			/>
			<button
				type={"button"}
				onClick={() => props.handleSubmit(username)}
			>
				enter chat
			</button>
		</div>
	);
};

export default UserPrompt;
