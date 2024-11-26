import exportIndex from "../inputAndOutPut-possible-issue/exportIndex"


export default `   
    ${exportIndex}
    type Query {
        findCarByname      (dto : CarloaderByName!)     : FindByName!
        findCarByPrice     (dto : CarloaderByPrice!)    : FindByPrice!
        userAllReservation (dto : receiveAllReservation): customerReservations!
    }
        
    type Mutation {
        createUser      (dto : CreateCustomer!):  Customer!
        updateUser      (dto : UpdateCustomer!):  Customer!
        appendCar       (dto : CreateCarInput!):  CarMannagement!
        removeCar       (dto : RemoveCar!):       CarMannagement!
        updateCar       (dto : UpdateCarInput!):  CarMannagement!
        reservCar       (dto : Reservation!):     customerReservation!
        removeReservCar (dto :RemoveReservation!):customerReservation!
    }
`