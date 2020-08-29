import React from "react";
import "./Chat.scss";

const Chat = (props: any) => {
	const { websocket } = props;

	const handleChatInput = (event: any) => {
		event.preventDefault();
		if (event.key.length === 1) {
			websocket.next({
				type: "char",
				data: [{ text: event.key }],
				time: Date.now()
			});
		}
	};

	const parseChars = () => {
		return props.data.map((d: any) => {
			const { color, text } = d;
			return (
				<span style={{ color: "#" + color }}>
					{text}
				</span>
			);
		});
	};

	return (
		<div
			contentEditable={true}
			id={"chat-container"}
			onKeyDown={handleChatInput}
			spellCheck={false}
			placeholder={"start typing here..."}
		>
			{ parseChars() }
		</div>
	);
};

export default Chat;
