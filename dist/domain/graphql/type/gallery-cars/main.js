"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const car_loader_1 = __importDefault(require("./car-loader"));
const findCars_1 = __importDefault(require("./findCars"));
exports.default = `${car_loader_1.default} ${findCars_1.default}`;
