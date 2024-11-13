"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const users_1 = __importDefault(require("./controllers/users"));
const missiles_1 = __importDefault(require("./controllers/missiles"));
const organizations_1 = __importDefault(require("./controllers/organizations"));
const db_1 = require("./config/db");
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
(0, db_1.connectToMongo)();
app.use('/api/users', users_1.default);
app.use('/api/missiles', missiles_1.default);
app.use('/api/organizations', organizations_1.default);
app.listen(PORT, () => {
    console.log(`the server is running on: http://localhost:${PORT}`);
});
