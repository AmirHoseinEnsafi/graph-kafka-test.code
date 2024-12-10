import User from "../../entity/userAndAdmin/userEntity";
import UserBroker from "../../infrastructure/user/userBroker";
import validateUpdateUser from "./appLayerValidate";


class UserApplicationlayer {

        private readonly userBroker : UserBroker ;

        constructor (userBroker : UserBroker ) {

                this.userBroker = userBroker ;

        }

        public createUserOrAdmin = async (dto : User) => {

                const jsonUserInfo = JSON.stringify(dto)

                const jsonResult = await this.userBroker.create(jsonUserInfo , dto.userName)

                const result = JSON.parse(jsonResult)

                if(result.message){
                        throw new Error(result.message)
                }else{
                        return result;
                }
        }


        public updateUserOrAdmin = async (dto : Partial<User>) => {

                const validate = validateUpdateUser(dto , 2) ;

                if(!validate){
                        return "userName or update part of the code is missing"
                }

                const jsonUserInfo = JSON.stringify(dto)

                const jsonResult = await this.userBroker.update(jsonUserInfo , dto.userName!)

                const result = JSON.parse(jsonResult)

                if(result.message){
                        throw new Error(result.message);
                }else{
                        return result;
                }
        }

        public deleteUserOrAdmin = async (userName : string) => {
                
                let jsonResult = await this.userBroker.delete(userName , userName)

                let result = JSON.parse(jsonResult)

                if(result.message){
                        throw new Error(result.message)
                }else{
                        return result;
                }
        }
}

export default UserApplicationlayer;