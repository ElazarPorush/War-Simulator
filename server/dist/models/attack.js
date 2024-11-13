"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const statusAttack_1 = require("../types/statusAttack");
const attackSchema = new mongoose_1.Schema({
    missileName: {
        type: String,
        required: [true, "missile name is required"]
    },
    from: {
        type: String,
        required: [true, "I need to know from where is it coming"]
    },
    to: {
        type: String,
        required: [true, "I need to know where to send this missile"]
    },
    timeToLeft: {
        type: Number,
        required: [true, "How much time left?"]
    },
    status: {
        type: String,
        default: statusAttack_1.StatusAttack.Launched
    },
});
exports.default = (0, mongoose_1.model)("Attack", attackSchema);
