import Car from "../../entity/Car/carEntity";


class ValidateCar {
    public validateCarUpdate = (car : Partial<Car> , minNumber : number ) : boolean => {
        if(!car.carName || !car.companyName){
            return false ;
        }
    
        const values = Object.values(car)
    
        const filteredUndefined = values.filter((value) => value !== undefined)
    
        return filteredUndefined.length >= minNumber
    
    }

    public validateDelete = (car : { companyName : string , carName : string } ) : boolean => {
        if(!car.carName || !car.companyName){
            return false ;
        }else{
            return true ;
        }
    }
}

const validateCar = new ValidateCar()
export default validateCar;