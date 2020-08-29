import React, {
	Component,
	useState,
	useEffect,
	useContext,
	createContext
} from "react";

import { webSocket } from "rxjs/webSocket";
import { fromEvent } from "rxjs";

import UserPrompt from "./UserPrompt";
import UserList from "./UserList";
import Chat from "./Chat";
import "./App.scss";

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

const websocket = webSocket("ws://" + window.location.host);

websocket.subscribe();

const App = () => {
	const [user, setUsername] = useState("");
	const [users, setUsers] = useState([]);
	const [data, setData] = useState([{ text: "start typing here...", color: 999999}]);

	useEffect(() => {
		const sub = websocket.subscribe(messageReceive);
		return () => sub.unsubscribe();
	}, []);

	const messageReceive = (msg: any) => {
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

	const joinChat = (username: string) => {
		setUsername(username);

		const user: IMessageData = {
			text: username,
			time: Date.now(),
			color: Math.floor(Math.random() * 999999)
		};

		const join: IMessage = {
			type: "join",
			data: [user],
			time: Date.now()
		};

		websocket.next(join);
	};

	return (
		<>
			{!user && <UserPrompt handleSubmit={joinChat} />}
			<UserList users={users} />
			<Chat data={data} websocket={websocket} />
		</>
	);
};

export default App;
