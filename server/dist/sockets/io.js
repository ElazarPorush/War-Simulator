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
    client.on('attack', (attack) => {
        const missile = missiles_json_1.default.find(msl => msl.name === attack.missileName);
        const newAttack = new attack_1.default(Object.assign(Object.assign({}, attack), { timeToLeft: missile.speed }));
        newAttack.save();
        app_1.io.emit("handle attack");
    });
    client.on("decrease missile", (decrease) => __awaiter(void 0, void 0, void 0, function* () {
        yield user_1.default.findByIdAndUpdate({ _id: decrease.user_id, "organization.resources.name": decrease.missileName }, {
            $dec: {
                "organization.resources.$.name": 1,
            }
        });
    }));
};
exports.handleConnection = handleConnection;
