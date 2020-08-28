import { IMessage, MessageChar, MessageJoin } from "./message";
import { webSocket } from "rxjs/webSocket";
import { of, fromEvent, interval } from "rxjs";
import { map } from "rxjs/operators";
import React, { Component, useEffect, useState } from 'react'

const subject = webSocket("ws://localhost:8001");

subject.subscribe();

const usernames: Array<any> = [];

const users$ = interval(1000).pipe(map(user => user));

users$.subscribe(msg => console.log(msg));

export function UserList() {
	const [state, setState] = useState(usernames);

	useEffect(() => {
		const subscription = users$.subscribe(setState as any);
		return () => subscription.unsubscribe();
	}, [users$]);

	return (
		<ul> { users$.forEach((u) => { return <br /> }) } </ul>
	)
}


const chat = {
	userList: [],
	username: ""
};

const canvas = {
	element: HTMLElement as any,
	context: undefined
};

const userJoin = (username: string) => {
	chat.username = username;
	subject.next(new MessageJoin(username));
};

const validateText = (text: string) => {
	return true;
};

const parseMessage = (msg: IMessage) => {
	console.log(msg)
};

const setupCanvas = () => {
	canvas.element = document.getElementById("canvas");
	canvas.context = canvas.element.getContext("2d");
};

const setupObservers = () => {
	const keypress = fromEvent(document, "keydown");

	subject.subscribe();

	subject.subscribe(
		msg => parseMessage(msg as IMessage),
		err => console.log(err)
	);

	keypress.subscribe(event =>
		subject.next(
			new MessageChar(
				chat.username,
				(event as KeyboardEvent).key
			)
		)
	);
};

const setup = () => {
	setupObservers();
};

const init = () => {
	userJoin(prompt() as string);
	setup();
};

init();
