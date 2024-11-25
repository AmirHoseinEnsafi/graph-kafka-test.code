"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `
    type customerReservation {
        status  : Int!
        message : String 
        value   : OutPutCarReserVation
    }

    type customerReservations {
        status  : Int!
        message : String 
        value   : [OutPutCarReserVation]
    }
`;
