import Car from "../../entity/Car/carEntity";
import User from "../../entity/userAndAdmin/userEntity";
import AdminBroker from "../../infrastructure/admin/adminBroker";
import validateCar from "./carAppLayerValidate";



class AdminManageMentAppLayer {

    private readonly adminBroker : AdminBroker ;
        
    constructor(adminBroker : AdminBroker){

        this.adminBroker = adminBroker ;

    }

    public appendCar = async (dto : Car , user : User) => {

        if(!user.isAdmin){
            throw new Error("only admin can append the car to gallery")
        }

        const jsonCar = JSON.stringify(dto)

        const jsonResult = await this.adminBroker.append(jsonCar , user.userName)

        const result = JSON.parse(jsonResult)

        if(result.message){
            throw new Error(result.message)
        }

        return result
    }

    public updateCar = async (dto : Partial<Car> , user : User) => {
        
        if(!user.isAdmin){
            throw new Error("only admin can append the car to gallery")
        }
        
        const validateResult = validateCar.validateCarUpdate(dto , 3)

        if(!validateResult){
            throw new Error("the company name and car name is not changabl and must send the at least one think to update")
        }

        const jsonCar = JSON.stringify(dto)

        const jsonResult = await this.adminBroker.update(jsonCar , user.userName)

        const result = JSON.parse(jsonResult)

        if(result.message){
            throw new Error(result.message)
        }else{
            return result
        }
    }

    public deleteCar = async (dto : {companyName : string , carName : string } , user : User) => {

        if(!user.isAdmin){
            throw new Error("only admin can append the car to gallery")
        }

        const resultValidate = validateCar.validateDelete(dto) 

        if(!resultValidate){
            throw new Error("both of the complany name and car name must be send to delete entity ")
        }

        const jsonCar = JSON.stringify(dto)

        const jsonResult = await this.adminBroker.delete(jsonCar , user.userName)

        const result = JSON.parse(jsonResult)

        if(result.message){
            throw new Error(result.message)
        }else{
            return result ;
        }
    }
}

export default AdminManageMentAppLayer;