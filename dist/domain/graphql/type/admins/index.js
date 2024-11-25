"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = __importDefault(require("./adminSelf/main"));
const main_2 = __importDefault(require("./Car-Crud/main"));
exports.default = `${main_1.default} ${main_2.default}`;
