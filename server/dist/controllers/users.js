"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../routes/users");
const router = (0, express_1.Router)();
router.post("/register", users_1.register);
router.post("/login", () => { });
router.patch("/updateMissiles/:id", () => { });
exports.default = router;
