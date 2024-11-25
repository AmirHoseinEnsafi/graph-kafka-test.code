"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const outPut_1 = __importDefault(require("./outPut"));
const remove_reserve_1 = __importDefault(require("./remove-reserve"));
const reserve_1 = __importDefault(require("./reserve"));
exports.default = `${outPut_1.default} ${remove_reserve_1.default} ${reserve_1.default}`;
