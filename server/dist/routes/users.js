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
exports.register = exports.login = exports.sid = void 0;
// import { initDataBase, addUser, userLogin } from "../services/users"
// import { LoginDto } from "../types/DTO/user"
const sid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // await initDataBase()
        res.sendStatus(201);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});
exports.sid = sid;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //   const loggedUser = await userLogin(req.body)
        //   res.status(200).json(loggedUser)
    }
    catch (err) {
        res.status(400).json(err.message);
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const newUser = await addUser(req.body)
        // res.status(201).json(newUser)
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err.message);
    }
});
exports.register = register;
