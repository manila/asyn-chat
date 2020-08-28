import React, { Component, useState, useEffect } from "react";
import { webSocket } from "rxjs/webSocket";
import { fromEvent } from "rxjs";
import UserList from "./Components/Users";
import Chat from "./Components/Chat";

interface IClient {
	username: string;
	socket: WebSocket;
}

interface IMessage {
	type: string;
	data: Array<IMessageData>;
	time: number;
}

interface IMessageData {
	text: string;
	time?: number;
	color?: number;
}

const subject = webSocket("ws://" + window.location.host);

subject.subscribe();

const username = prompt() as string;

const user: IMessageData = {
	text: username,
	time: Date.now(),
	color: Math.floor(Math.random() * 999999)
}

const join: IMessage = {
	type: "join",
	data: [user],
	time: Date.now()
}

subject.next(join);

const App = () => {
	const [users, setUsers] = useState([]);
	const [data, setData] = useState([{text: "start typing here...", color: 999999}]);

	useEffect(() => {
		const sub = subject.subscribe(handleMessageReceive);
		return () => sub.unsubscribe();
	}, []);

	const handleMessageReceive = (msg: any) => {
		switch (msg.type) {
			case "join":
				setUsers(msg.data);
				break;
			case "char2":
				setData(msg.data);
				break;
			default:
		}
	};

	return (
		<>
			<UserList users={users} />
			<Chat data={data} subject={subject} />
		</>
	);
};

export default App;
