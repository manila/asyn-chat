import React, { useEffect, useRef } from "react";
import "./Chat.scss";

const Chat = (props: any) => {
	const { websocket } = props;
	const chatInput = useRef(null);

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

	const handleChatReceive = () => {
		return false;
	};

	const parseChars = () => {
		let { user } = props;
		return props.data
			.filter(
				({ time }: { time: number }) =>
					time >= user.time
			)
			.map((d: any) => {
				const { color, text } = d;
				console.log(d);
				return (
					<span style={{ color: "#" + color }}>
						{text}
					</span>
				);
			});
	};

	return (
		<div
			ref={chatInput}
			id={"chat-container"}
			spellCheck={false}
			placeholder={"start typing here..."}
			onKeyDown={handleChatInput}
			contentEditable={true}
		>
			{parseChars()}
		</div>
	);
};

export default Chat;
