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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = exports.userLogin = exports.addUser = void 0;
const bcrypt_1 = require("bcrypt");
const user_1 = __importDefault(require("../models/user"));
const organizations_json_1 = __importDefault(require("../data/organizations.json"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const addUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(user.username);
        const encPass = yield (0, bcrypt_1.hash)(user.password, 10);
        const organization = organizations_json_1.default.find(org => org.name === user.organization);
        const newUser = new user_1.default({
            username: user.username,
            password: encPass,
            organization: organization
        });
        return yield newUser.save();
    }
    catch (err) {
        throw new Error(`Error accured while creating this user: ${err}`);
    }
});
exports.addUser = addUser;
const userLogin = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userFromDatabase = yield user_1.default.findOne({ username: user.username }).lean();
        if (!userFromDatabase)
            throw new Error("user not found");
        const match = yield (0, bcrypt_1.compare)(user.password, userFromDatabase.password);
        if (!match)
            throw new Error("wrong password");
        const token = yield jsonwebtoken_1.default.sign({
            user_id: userFromDatabase._id,
            username: userFromDatabase.username
        }, process.env.JWT_SECRET, {
            expiresIn: "10m"
        });
        return Object.assign(Object.assign({}, userFromDatabase), { token, password: "******" });
    }
    catch (err) {
        throw err;
    }
});
exports.userLogin = userLogin;
const getUserProfile = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userFromDatabase = yield user_1.default.findOne({ username: user.username }).lean();
        if (!userFromDatabase)
            throw new Error("user not found");
        return Object.assign(Object.assign({}, userFromDatabase), { password: "******" });
    }
    catch (err) {
        throw err;
    }
});
exports.getUserProfile = getUserProfile;
