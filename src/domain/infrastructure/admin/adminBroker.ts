import produser from "../../../kafka/produser";
import { Consumer } from "kafkajs";
import AdminConsumer from "./adminComsumerMaker"


class AdminBroker {

    private readonly consumer : AdminConsumer ;
    private topic             : {[key : string] : string} = {}
    private appendMap         : Map<string , string>;
    private updateMap         : Map<string , string>;
    private deleteMap         : Map<string , string>;

    constructor( consumer : AdminConsumer ){

        this.consumer = consumer
        this.topic.append = "appendCarProcess"
        this.topic.update = "updateCarProcess"
        this.topic.delete = "deleteCarProcess"
        this.appendMap    = new Map<string , string>()
        this.updateMap    = new Map<string , string>()
        this.deleteMap    = new Map<string , string>()
        
    }

    private sendAndReceive = async (dto : {consumer : Consumer , map : Map<string , string> , topic : string , carInfo : string , key : string}) => {
        let {consumer , map , topic , carInfo , key} = dto 
        let result : string = await new Promise( async (resolve , reject) => {
            await produser.send({
                topic : topic ,
                messages : [{ value : carInfo , key : key }]
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

    public append = async ( carInfo : string , key : string ) : Promise<string> => {

        let informationToSend = { consumer : this.consumer.appendConsumer , map : this.appendMap , topic : this.topic.append , carInfo , key }

        let result = await this.sendAndReceive(informationToSend)

        return result
    }

    public update = async ( carInfo : string , key : string ) : Promise<string> => {

        let informationToSend = { consumer : this.consumer.updateConsumer , map : this.updateMap , topic : this.topic.update , carInfo , key }

        let result = await this.sendAndReceive(informationToSend)

        return result
    }

    public delete = async ( carInfo : string , key : string ) : Promise<string> => {

        let informationToSend = { consumer : this.consumer.deleteComsumer , map : this.deleteMap , topic : this.topic.delete , carInfo , key }

        let result = await this.sendAndReceive(informationToSend)

        return result
    }
}


export default AdminBroker;