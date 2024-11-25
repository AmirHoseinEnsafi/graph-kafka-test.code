import exportIndex from "../inputAndOutPut-possible-issue/exportIndex"


export default `   
    ${exportIndex}
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
`