"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../admins/index"));
const index_2 = __importDefault(require("../customer/index"));
const main_1 = __importDefault(require("../gallery-cars/main"));
exports.default = `${index_1.default} ${index_2.default} ${main_1.default}`;
