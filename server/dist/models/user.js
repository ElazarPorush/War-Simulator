"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "username is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    organization: {
        type: {
            name: String,
            resources: {
                type: [
                    {
                        name: String,
                        amount: Number
                    }
                ]
            },
            budget: Number
        },
        required: [true, "organization is required"]
    }
});
exports.default = (0, mongoose_1.model)("User", userSchema);
