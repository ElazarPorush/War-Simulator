"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleConnection = void 0;
const app_1 = require("../app");
const missiles_json_1 = __importDefault(require("../data/missiles.json"));
const attack_1 = __importDefault(require("../models/attack"));
const handleConnection = (client) => {
    console.log(`[socket.io] New Connection ${client.id}`);
    client.on("disconnect", () => {
        console.log("Bye bye user");
    });
    client.on('attack', (attack) => {
        const missile = missiles_json_1.default.find(msl => msl.name === attack.missileName);
        const newAttack = new attack_1.default(Object.assign(Object.assign({}, attack), { timeToLeft: missile.speed }));
        newAttack.save();
        app_1.io.emit("handle attack");
    });
};
exports.handleConnection = handleConnection;
