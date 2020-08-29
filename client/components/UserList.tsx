import React from "react";
import "./UserList.scss";

const UserList = (props: any) => {
	const { users } = props;

	const listUsers = () => {
		return users.map((user: any) => {
			const {time, text, color} = user;
			return (
				<li key={time} style={{ color: "#" + color }}>
					{text}
				</li>
			);
		});
	};

	return (
		<div id="user-container">
			<ul> {listUsers()} </ul>
		</div>
	);
};

export default UserList;
