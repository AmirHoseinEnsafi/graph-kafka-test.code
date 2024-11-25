"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_1 = __importDefault(require("./create"));
const outPut_1 = __importDefault(require("./outPut"));
const update_1 = __importDefault(require("./update"));
exports.default = `${create_1.default} ${outPut_1.default} ${update_1.default}`;
