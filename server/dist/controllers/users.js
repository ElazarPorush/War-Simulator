"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../routes/users");
const verifyUser_1 = __importDefault(require("../middlewares/verifyUser"));
const router = (0, express_1.Router)();
router.post("/register", users_1.register);
router.post("/login", users_1.login);
router.post("/", verifyUser_1.default, users_1.getProfile);
exports.default = router;
