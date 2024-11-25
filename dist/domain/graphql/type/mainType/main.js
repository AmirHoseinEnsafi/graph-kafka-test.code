"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exportIndex_1 = __importDefault(require("../inputAndOutPut-possible-issue/exportIndex"));
exports.default = `   
    ${exportIndex_1.default}
    type Query {
        findCarByname  (dto : CarloaderByName!) : FindByName!
        findCarByPrice (dto : CarloaderByPrice!): FindByPrice!
        userAllReservation                     : customerReservations!
    }
    type Mutation {
        createAdmin     (dto : CreateInput!):    AdminDetail!
        updateAdmin     (dto : UpdateInput!):    AdminDetail!
        appendCar       (dto : CreateCarInput!):  CarMannagement!
        removeCar       (dto : RemoveCar!):       CarMannagement!
        updateCar       (dto : UpdateCarInput!):  CarMannagement!
        createUser      (dto : CreateCustomer!):  CustomerDetail!
        updateUser      (dto : UpdateCustomer!):  CustomerDetail!
        reservCar       (dto : Reservation!):     customerReservation!
        removeReservCar (dto :RemoveReservation!):customerReservation!
    }
`;
