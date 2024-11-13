"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleConnection = void 0;
const handleConnection = (client) => {
    console.log(`[socket.io] New Connection ${client.id}`);
    client.on("disconnect", () => {
        console.log("Bye bye user");
    });
};
exports.handleConnection = handleConnection;
