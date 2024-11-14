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
exports.handleConnection = void 0;
const app_1 = require("../app");
const missiles_json_1 = __importDefault(require("../data/missiles.json"));
const attack_1 = __importDefault(require("../models/attack"));
const user_1 = __importDefault(require("../models/user"));
const handleConnection = (client) => {
    console.log(`[socket.io] New Connection ${client.id}`);
    client.on("disconnect", () => {
        console.log("Bye bye user");
    });
    client.on('attack', (attack) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const missile = missiles_json_1.default.find(msl => msl.name === attack.missileName);
            const newAttack = new attack_1.default(Object.assign(Object.assign({}, attack), { timeToLeft: missile.speed }));
            yield newAttack.save();
            app_1.io.emit("fetch attacks");
        }
        catch (err) {
            throw new Error(err.message);
        }
    }));
    client.on("decrease missile", (decrease) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // const user: IUser = await User.find({_id: decrease.user_id})!
            // for (const rocket of user.organization.resources) {
            //     if (rocket.name === decrease.missileName){
            //         rocket.amount = rocket.amount - 1
            //         break
            //     }
            // }
            // user.save()
        }
        catch (err) {
            console.log(err);
            throw new Error(err.message);
        }
    }));
    client.on("find missile to defend", (findMissile) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_1.default.findById(findMissile.user_id);
        let sum = 0;
        let finalMissile = "";
        for (const missile of user.organization.resources) {
            const missileDefend = missiles_json_1.default.find(msl => msl.name === missile.name);
            if (findMissile.missileSpeed >= missileDefend.speed) {
                if (missileDefend.speed >= sum) {
                    sum = missileDefend.speed;
                    finalMissile = missileDefend.name;
                }
            }
        }
        client.emit("update missile defend", finalMissile);
    }));
    client.on("set status", (attack_id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // const attacks: IAttack[] = await Attack.find()
            // const attack = attacks.find(atc => atc._id === attack_id)!
            // const newAttack: IAttack = attack
            // newAttack.timeToLeft = 0
            // newAttack.status = StatusAttack.Hit
            // newAttack.save()
            // io.emit("fetch attacks")
        }
        catch (error) {
            throw error;
        }
    }));
};
exports.handleConnection = handleConnection;
