"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.login = exports.register = void 0;
const users_1 = require("../services/users");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const newUser = yield (0, users_1.addUser)(req.body);
        res.status(201).json(newUser);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err.message);
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const loggedUser = yield (0, users_1.userLogin)(req.body);
        res.status(200).json(loggedUser);
    }
    catch (err) {
        res.status(400).json(err.message);
    }
});
exports.login = login;
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const user = yield (0, users_1.getUserProfile)(req.body);
        res.status(200).json(user);
    }
    catch (err) {
        res.status(400).json(err.message);
    }
});
exports.getProfile = getProfile;
