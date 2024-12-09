import { Consumer } from "kafkajs";
import produser from "../../../kafka/produser";
import UserConsumer from "./userConsumerMaker";

class UserBroker{

    private topic : {[key : string] : string} = {}
    private readonly userConsumer : UserConsumer ;
    private createUserMap : Map<string , string> ;
    private updateUserMap : Map<string , string> ;
    private deleteUserMap : Map<string , string> ;
    private readUserMap   : Map<string , string> ;

    constructor (userConsumer : UserConsumer) {
        this.topic.create  = "createUserProcess"
        this.topic.update  = "updateUserProcess"
        this.topic.delete  = "deleteUserProcess"
        this.topic.read    = "readUserProcess"
        this.userConsumer  = userConsumer
        this.createUserMap = new Map<string , string>()
        this.updateUserMap = new Map<string , string>()
        this.deleteUserMap = new Map<string , string>()
        this.readUserMap   = new Map<string , string>()
    }

    private sendAndRecive = async (dto : {consumer : Consumer , map : Map<string , string> , topic : string , userInfo : string , key : string}) : Promise<string> => {
        let {consumer , map , topic , userInfo , key} = dto 
        let result : string = await new Promise( async (resolve , reject) => {
            await produser.send({
                topic : topic ,
                messages : [{ value : userInfo , key : key }]
            })

            const timeout = setTimeout(() => {
                let result = map.get(key)
                if(result) {
                    resolve(result)
                }else{
                    reject("time end")
                }
            } , 500)

            await consumer.run({
                eachMessage : async ({message}) => {
    
                    let messageKey   = message.key?.toString()   as string
                    let messageValue = message.value?.toString() as string
    
                    if(messageKey === key){
                        clearTimeout(timeout)
                        resolve(messageValue)
                    }else{
                        map.set(messageKey , messageValue)
                    }
                }
            })
        })

        return result;
    }

    public create = async (userInfo : string , key : string) : Promise<string> => {

        let informationToSend = {consumer : this.userConsumer.createUserConsumer , map : this.createUserMap , topic : this.topic.create , userInfo , key}

        let result = await this.sendAndRecive(informationToSend)

        return result
    }

    public update = async (userInfo : string , key : string) : Promise<string> => {

        let informationToSend = {consumer : this.userConsumer.updateUserConsumer , map : this.updateUserMap , topic : this.topic.update , userInfo , key}

        let result = await this.sendAndRecive(informationToSend)
        
        return result
    }

    public delete = async (userInfo : string , key : string) => {

        let informationToSend = {consumer : this.userConsumer.deleteUserConsumer , map : this.deleteUserMap , topic : this.topic.delete , userInfo , key}

        let result = await this.sendAndRecive(informationToSend)
        
        return result
    }

    public read = async (userInfo : string , key : string) => {

        let informationToSend = {consumer : this.userConsumer.readUserConsumer , map : this.readUserMap , topic : this.topic.read , userInfo , key}

        let result = await this.sendAndRecive(informationToSend)
        
        return result

    }
}

export default UserBroker ;