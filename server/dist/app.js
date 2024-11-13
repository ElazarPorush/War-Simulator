"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.listen(PORT, () => {
    console.log(`the server is running on: http://localhost:${PORT}`);
});
