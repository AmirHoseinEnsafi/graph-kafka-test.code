"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const importIndex_1 = __importDefault(require("./importIndex"));
const adminITSelf_1 = __importDefault(require("./admin/adminITSelf"));
const carManagement_1 = __importDefault(require("./admin/carManagement"));
const customerItSelf_1 = __importDefault(require("./customer/customerItSelf"));
const customerReservation_1 = __importDefault(require("./customer/customerReservation"));
const findByName_1 = __importDefault(require("./gallery/findByName"));
const findByPrice_1 = __importDefault(require("./gallery/findByPrice"));
exports.default = `${importIndex_1.default} ${adminITSelf_1.default} ${carManagement_1.default} ${customerItSelf_1.default} ${customerReservation_1.default} ${findByName_1.default} ${findByPrice_1.default}`;
