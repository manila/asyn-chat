"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var ws_1 = __importDefault(require("ws"));
var message2 = [];
var clients = [];
var users = [];
var app = express_1.default();
var PORT = 8000;
var server = http_1.default.createServer(app);
var wss = new ws_1.default.Server({ server: server });
wss.on("connection", function (ws, req) {
    ws.on("message", function (message) {
        try {
            console.log(message);
            var msg = JSON.parse(message);
            if (msg.type == "join") {
                var client = {
                    data: msg.data[0],
                    socket: ws
                };
                clients.push(client);
                clients.forEach(function (_a) {
                    var socket = _a.socket;
                    return socket.send(JSON.stringify({
                        type: "join",
                        data: clients.map(function (_a) {
                            var data = _a.data;
                            return data;
                        })
                    }));
                });
                console.log("sent to clients");
                console.log(msg.data[0].text + " Joined!");
            }
            else if (msg.type == "char") {
                msg.data.forEach(function (e) {
                    e.color = clients.find(function (_a) {
                        var socket = _a.socket;
                        return ws === socket;
                    }).data.color;
                    message2.push(e);
                });
                message2 = message2.slice(-42);
                var message3 = {
                    type: "char",
                    data: msg.data,
                    time: Date.now()
                };
                clients.forEach(function (_a) {
                    var socket = _a.socket;
                    return socket.send(JSON.stringify({
                        type: "char2",
                        data: message2
                    }));
                });
            }
            else {
                console.log(msg);
            }
        }
        catch (error) {
            console.log(error);
        }
    });
    ws.on("close", function () {
        clients = clients.filter(function (_a) {
            var socket = _a.socket, data = _a.data;
            return ws != socket;
        });
        console.log(clients);
        clients.forEach(function (_a) {
            var socket = _a.socket;
            socket.send(JSON.stringify({
                type: "join",
                data: clients.map(function (_a) {
                    var data = _a.data;
                    return data;
                })
            }));
        });
    });
});
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.get("/", function (req, res) { return res.sendFile(__dirname + "/views/index.html"); });
server.listen(PORT, function () {
    console.log("running on port: " + PORT);
});
