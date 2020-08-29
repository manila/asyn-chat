import React from "react";
import "./UserPrompt.scss";

const UserPrompt = (props: any) => {
	let username = "";

	const updateUsername = (event: any) => {
		username = event.target.value;
	};

	const handleSubmit = (event: any) => {
		props.handleSubmit(username);
		event.preventDefault();
	};

	return (
		<div id={"user-prompt"}>
			<form onSubmit={handleSubmit}>
				<input
					type={"text"}
					id={"username-input"}
					placeholder={"enter a username"}
					pattern={"[a-zA-Z0-9_-]{1,15}"}
					title={
						"Username must be 1-15 characters long with no spaces"
					}
					onChange={updateUsername}
					autoFocus
				/>
				<button type={"submit"}>enter chat</button>
			</form>
		</div>
	);
};

export default UserPrompt;
