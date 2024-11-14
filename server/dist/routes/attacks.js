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
exports.getAttacks = void 0;
const attacks_1 = require("../services/attacks");
const getAttacks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attacks = yield (0, attacks_1.getAttacksList)();
        res.status(200).json(attacks);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err.message);
    }
});
exports.getAttacks = getAttacks;
