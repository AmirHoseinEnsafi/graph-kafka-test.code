import produser from "../../../kafka/produser";
import UserConsumer from "./userConsumerMaker";

class UserBroker{

    private readonly userConsumer : UserConsumer
    private createUserMap : Map<string , string> ;
    private updateUserMap : Map<string , string> ;
    private deleteUserMap : Map<string , string> ;
    private readUserMap   : Map<string , string> ;

    constructor (userConsumer : UserConsumer) {
        this.userConsumer  = userConsumer
        this.createUserMap = new Map<string , string>()
        this.updateUserMap = new Map<string , string>()
        this.deleteUserMap = new Map<string , string>()
        this.readUserMap   = new Map<string , string>()
    }

    public create = async (userInfo : string , key : string) : Promise<string> => {
        let result : string = await new Promise(async (resolve , reject) => {
            
            await produser.send({
                topic : "createUserProcess" ,
                messages : [{value :  userInfo , key : key}]
            })
            
            const timeout = setTimeout(() => {
                let result = this.createUserMap.get(key)
                if(result){
                    resolve(result)
                } 
                else {
                    reject("time end")
                }

            }, 500);

            let result = this.createUserMap.get("") 
            if(result){
                resolve(result)
            }
            
            await this.userConsumer.createUserConsumer.run({
                eachMessage : async ({topic , partition , message}) => {

                    let messageKey   = message.key?.toString()   as string
                    let messageValue = message.value?.toString() as string

                    if(messageKey === key) {
                        resolve(messageValue)
                    }else{
                        this.createUserMap.set(messageKey , messageValue)
                    }
                }
            })
        })

        return result;
    }
}