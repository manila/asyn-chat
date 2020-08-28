export { IMessage };

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
	user: string;
	time: number;
	text?: string;

	constructor(text: string) {
		this.type = 'char';
		this.user = getUsername();
		this.time = Date.now();
		this.text = text;
	}
}

class MessageJoin implements IMessage {
	type: 'char' | 'join' | 'quit' | 'echo';
	user: string;
	time: number;
	text?: string;

	constructor() {
		this.type = 'join';
		this.user = getUsername();
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
