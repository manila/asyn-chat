import React, { useState, useEffect } from "react";
import { IMessage, IMessageData } from "./MessageInterface";
import { useSubject } from "./hooks";
import "./UserList.scss";

const UserList = (props: any) => {
	const { websocket } = props;
	const [users, setUsers] = useState([]);

	const listUsers = () => {
		return users.map((user: any) => {
			const { time, text, color } = user;
			return (
				<li key={time} style={{ color: "#" + color }}>
					{text}
				</li>
			);
		});
	};

	const handleReceive = (message: any) => {
		if (message.type === "join") {
			setUsers(message.data);
		}
	};

	useEffect(() => useSubject(websocket, handleReceive), []);

	return (
		<div id="user-container">
			<ul> {listUsers()} </ul>
		</div>
	);
};

export default UserList;
