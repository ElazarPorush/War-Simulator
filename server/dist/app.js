"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const users_1 = __importDefault(require("./controllers/users"));
const attacks_1 = __importDefault(require("./controllers/attacks"));
const db_1 = require("./config/db");
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const io_1 = require("./sockets/io");
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
const httpServer = http_1.default.createServer(app);
exports.io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
        methods: "*"
    }
});
exports.io.on("connection", io_1.handleConnection);
(0, db_1.connectToMongo)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/users', users_1.default);
app.use('/api/attacks', attacks_1.default);
httpServer.listen(PORT, () => {
    console.log(`the server is running on: http://localhost:${PORT}`);
});
