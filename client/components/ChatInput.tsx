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
		const now = Date.now();
		const local = data;

		if (event.key.length === 1) {
			local.push({
				type: "char",
				data: [{ text: event.key, time: now }],
				time: now
			} as any);
			setData(local);
			websocket.next({
				type: "char",
				data: [{ text: event.key, time: now }],
				time: now
			});
		}

		event.preventDefault();
	};

	const messageReceive = (message: any) => {
		if (message.type == "char2") {
			setData(message.data);
		}
	};

	const parseChars = () => {
		return data
			.filter(
				({ time }: { time: number }) =>
					time >= user.time
			)
			.reduce(
				(acc: string, cur: any) =>
					acc +
					'<span style="color: #' +
					(cur.color as string) +
					`">${cur.text}</span>`,
				""
			);
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
	}, [data]);

	useEffect(() => useSubject(websocket, messageReceive), [data]);

	return (
		<div
			ref={chatInput}
			id={"chat-container"}
			style={{ "caret-color": "#" + user.color } as React.CSSProperties}
			spellCheck={false}
			onKeyDown={handleChatInput}
			contentEditable={true}
			suppressContentEditableWarning={true}
			dangerouslySetInnerHTML={{ __html: parseChars() }}
		></div>
	);
};

export default ChatInput;
