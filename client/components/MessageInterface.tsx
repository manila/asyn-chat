export interface IMessage {
	type: string;
	data: Array<IMessageData>;
	time: number;
}

export interface IMessageData {
	text: string;
	time?: number;
	color?: number;
}
