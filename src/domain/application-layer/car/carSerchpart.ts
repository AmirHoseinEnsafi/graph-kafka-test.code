import CarBroker from "../../infrastructure/gallery-car/carBroker";
import User from "../../entity/userAndAdmin/userEntity";
import validateCar from "./carAppLayerValidate";


class CarLoader {

    private readonly carBroker : CarBroker ;

    constructor( carBroker : CarBroker ){

        this.carBroker = carBroker ;

    }

    public loadReservation = async ( userName : string ) => {

        const jsonResult = await this.carBroker.loadResevation(userName)

        const result = JSON.parse(jsonResult)

        if(result.message){
            throw new Error(result.message)
        }else{
            return result
        }
    }


    public findOne = async (dto : { companyName : string , carName : string } , user : User) => {
        
        const validate = validateCar.validateLoadOne(dto)

        if(!validate){
            throw new Error("for loading the one of the car detail must to send the company name and car name")
        }

        const brokerDTO = {...dto , readOne : true}

        const jsonbrokerDto = JSON.stringify(brokerDTO)

        const jsonResult = await this.carBroker.read(jsonbrokerDto , user.userName)

        const result = JSON.parse(jsonResult)

        if(result.message){
            throw new Error(result.message)
        }else{
            return result
        }
    }


    public findManyByPrice = async (dto : {minPrice : number , maxPrice : number} , user : User) => {

        const validate = validateCar.validateMinAndMaxPrice(dto)

        if(!validate){
            throw new Error("you must send the min price and max price for receive the renge")
        }

        const sendDTO = {...dto , findByPrice : true}

        const jsonPrice = JSON.stringify(sendDTO)

        const jsonResult = await this.carBroker.read(jsonPrice , user.userName)

        const result = JSON.parse(jsonResult)

        if(result.message){
            throw new Error(result.message)
        }else{
            return result ;
        }

    }

    public findByCompany = async (companyName : string , user : User) => {
        
        const sendDTO = {companyName , findByCompany : true } 

        const jsonDTO = JSON.stringify(sendDTO)

        const jsonResult = this.carBroker.read(jsonDTO , user.userName) 

        const result = JSON.parse(jsonDTO)

        if(result.message){
            throw new Error(result.message)
        }else{
            return result
        }

    }
}

export default CarLoader ;