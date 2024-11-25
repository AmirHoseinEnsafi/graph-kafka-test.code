"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const car_Detail_1 = __importDefault(require("./car-Detail"));
const newAppend_car_1 = __importDefault(require("./newAppend-car"));
const remove_car_1 = __importDefault(require("./remove-car"));
const update_car_1 = __importDefault(require("./update-car"));
exports.default = `${car_Detail_1.default} ${newAppend_car_1.default} ${remove_car_1.default} ${update_car_1.default}`;
