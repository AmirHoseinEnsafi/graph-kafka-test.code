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

    public validateLoadOne = (dto : {companyName : string , carName : string}) : boolean => {
        if(!dto.carName || !dto.companyName){
            return false ;
        }else{
            return true
        }
    }

    public validateMinAndMaxPrice = (dto : {minPrice : number , maxPrice : number}) : boolean => {
        if(!dto.maxPrice || !dto.minPrice){
            return false
        }else{
            return true 
        }
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