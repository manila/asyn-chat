"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var PORT = 8000;
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.get("/", function (req, res) { return res.sendFile(__dirname + "/views/index.html"); });
app.listen(PORT, function () {
    console.log("running on port: " + PORT);
});
