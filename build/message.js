"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getUsername = function () {
    return 'NA';
};
var MessageChar = /** @class */ (function () {
    function MessageChar(text) {
        this.type = 'char';
        this.user = getUsername();
        this.time = Date.now();
        this.text = text;
    }
    return MessageChar;
}());
var MessageJoin = /** @class */ (function () {
    function MessageJoin() {
        this.type = 'join';
        this.user = getUsername();
        this.time = Date.now();
    }
    return MessageJoin;
}());
var MessageQuit = /** @class */ (function () {
    function MessageQuit() {
        this.type = 'quit';
        this.user = getUsername();
        this.time = Date.now();
    }
    return MessageQuit;
}());
var MessageEcho = /** @class */ (function () {
    function MessageEcho() {
        this.type = 'echo';
        this.user = getUsername();
        this.time = Date.now();
    }
    return MessageEcho;
}());
