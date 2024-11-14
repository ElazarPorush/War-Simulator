"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const attacks_1 = require("../routes/attacks");
const verifyUser_1 = __importDefault(require("../middlewares/verifyUser"));
const router = (0, express_1.Router)();
router.get("/", verifyUser_1.default, attacks_1.getAttacks);
exports.default = router;
