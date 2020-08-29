import React, { useState, useEffect, useRef } from "react";
import { useSubject } from "./hooks";
import "./ChatInput.scss";

const ChatInput = (props: any) => {
	const { websocket, user } = props;
	const chatInput = useRef(null);
	const [data, setData] = useState([
		{
			text: "start typing here...",
			color: 999999,
			time: Date.now() + 1000 * 3600 * 60
		}
	]);

	const handleChatInput = (event: any) => {
		event.preventDefault();

		if (event.key.length === 1) {
			websocket.next({
				type: "char",
				data: [{ text: event.key, time: Date.now() }],
				time: Date.now()
			});
		}
	};

	const messageReceive = (message: any) => {
		if ((message.type == "char2")) {
			setData(message.data);
		}
	};

	const parseChars = () => {
		return data
			.filter(
				({ time }: { time: number }) =>
					time >= user.time
			)
			.map((d: any) => {
				const { color, text, time } = d;
				return (
					<span key={time} style={{ color: "#" + color }}>
						{text}
					</span>
				);
			});
	};

	useEffect(() => {
		let element = chatInput!.current as any;
		let selection = window.getSelection();
		element &&
			selection!.collapse(
				element,
				element!.childElementCount
			);
		element && element.focus();
	});

	useEffect(() => useSubject(websocket, messageReceive));

	return (
		<div
			ref={chatInput}
			id={"chat-container"}
			spellCheck={false}
			placeholder={"start typing here..."}
			onKeyDown={handleChatInput}
			contentEditable={true}
			suppressContentEditableWarning={true}
		>
			{parseChars()}
		</div>
	);
};

export default ChatInput;
