import path from "path";
import express from "express";
import http from "http";
import WebSocket from "ws";

let message2: Array<IMessageData> = [];
let clients: Array<IClient> = [];
const users: Array<string> = [];
const app = express();
const PORT = process.env.PORT;

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

interface IClient {
	data: IMessageData;
	socket: WebSocket;
}

interface IMessage {
	type: string;
	data: Array<IMessageData>;
	time: number;
}

interface IMessageData {
	text: string;
	time?: number;
	color?: number;
}

wss.on("connection", (ws: any, req: any) => {
	ws.on("message", (message: any) => {
		try {
			const msg: IMessage = JSON.parse(message);

			if (msg.type == "join") {
				let client: IClient = {
					data: msg.data[0],
					socket: ws
				};

				clients.push(client);

				clients.forEach(({ socket }) =>
					socket.send(
						JSON.stringify({
							type: "join",
							data: clients.map(
								({
									data
								}) => data
							)
						})
					)
				);

			} else if (msg.type == "char") {
				msg.data.forEach((e: IMessageData) => {
					e.color = clients.find(({ socket }) => ws === socket)!.data.color;
					message2.push(e as IMessageData)
				});
				message2 = message2.slice(-42);
				const message3: IMessage = {
					type: "char",
					data: msg.data,
					time: Date.now()
				};
				clients.forEach(({ socket }) =>
					socket.send(
						JSON.stringify({
							type: "char2",
							data: message2
						})
					)
				);
			} else {
				console.log(msg);
			}
		} catch (error) {
			console.log(error);
		}
	});

	ws.on("close", () => {
		clients = clients.filter(
			({ socket, data }) => ws != socket
		);
		clients.forEach(({ socket }) => {
			socket.send(
				JSON.stringify({
					type: "join",
					data: clients.map(
						({ data }) => data
					)
				})
			);
		});
	});
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html"));

server.listen(PORT, () => {
	console.log("running on port: " + PORT);
});
