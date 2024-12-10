import User from "../../entity/userAndAdmin/userEntity";

function validateUpdateUser (dto : Partial<User> , numberNeed : number) {

    if(!dto.userName){

        return false

    }else{
        const values = Object.values(dto)
    
        const extractUndefined = values.filter((value) => value !== undefined)
    
        return extractUndefined.length >= numberNeed
    }
}




export default validateUpdateUser;