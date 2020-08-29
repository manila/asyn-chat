import React, {
	Component,
	useState,
	useEffect,
	useContext,
	createContext
} from "react";

import { useSubject } from "./hooks";

import "./App.scss";

import { webSocket } from "rxjs/webSocket";
import { fromEvent } from "rxjs";

import UserPrompt from "./UserPrompt";
import UserList from "./UserList";
import ChatInput from "./ChatInput";

import { IMessage, IMessageData } from "./MessageInterface";

const host = window.location.host;
const protocol = /s:$/.test(window.location.protocol) ? "s" : "";
const websocket = webSocket(`ws${protocol}://${host}`);
websocket.subscribe();

const App = () => {
	const [user, setUser] = useState({});

	const joinChat = (username: string) => {
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

		setUser(user);
		websocket.next(join);
	};

	return (
		<>
			{!user.hasOwnProperty("text") && (
				<UserPrompt
					handleSubmit={joinChat}
					websocket={websocket}
				/>
			)}
			<UserList websocket={websocket} />
			{user.hasOwnProperty("text") && (
				<ChatInput
					user={user}
					websocket={websocket}
				/>
			)}
		</>
	);
};

export default App;
