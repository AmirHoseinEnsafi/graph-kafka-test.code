

export default `
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
`