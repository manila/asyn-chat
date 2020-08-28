export { IMessage, MessageChar, MessageJoin, MessageQuit, MessageEcho };

const getUsername = () => {
	return 'NA';
}

interface IMessage {
	type: 'char' | 'join' | 'quit' | 'echo';
	user: string;
	time: number;
	text?: string;
}

class MessageChar implements IMessage {
	type: 'char' | 'join' | 'quit' | 'echo';
	time: number;
	user: string;
	text?: string;

	constructor(user: string, text: string) {
		this.type = 'char';
		this.time = Date.now();
		this.text = text;
		this.user = user;
	}
}

class MessageJoin implements IMessage {
	type: 'char' | 'join' | 'quit' | 'echo';
	user: string;
	time: number;
	text?: string;

	constructor(user:string) {
		this.type = 'join';
		this.user = user;
		this.time = Date.now();
	}
}

class MessageQuit implements IMessage {
	type: 'char' | 'join' | 'quit' | 'echo';
	user: string;
	time: number;
	text?: string;

	constructor() {
		this.type = 'quit';
		this.user = getUsername();
		this.time = Date.now();
	}
}

class MessageEcho implements IMessage {
	type: 'char' | 'join' | 'quit' | 'echo';
	user: string;
	time: number;
	text?: string;

	constructor() {
		this.type = 'echo';
		this.user = getUsername();
		this.time = Date.now();
	}
}
