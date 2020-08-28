import React from "react";

const Chat = (props: any) => {
	const { subject } = props;

	const handleChatInput = (event: any) => {
		event.preventDefault();
		if (event.key.length === 1) {
			subject.next({
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
		>
			{ parseChars() }
		</div>
	);
};

export default Chat;
