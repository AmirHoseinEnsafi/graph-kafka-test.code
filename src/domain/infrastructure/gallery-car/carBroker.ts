import produser from "../../../kafka/produser";
import CarConsumer from "./carConsumerMaker";

class CarBroker {

    public topic   : {[key :string] : string} = {}
    public readMap : Map< string , string >
    private readonly carConsumer : CarConsumer

    constructor( carConsumer : CarConsumer){
        this.topic.read  = "carReadProcessor"
        this.carConsumer = carConsumer 
        this.readMap     = new Map< string , string >()
    }

    public read = async (carInfo : string , key : string) : Promise<string> => {
        const result : string = await new Promise ( async (resolve , reject) => {
            await produser.send({
                topic : this.topic.read ,
                messages : [{value : carInfo , key}]
            })

            const timeout = setTimeout(() => {
                const result = this.readMap.get(key) 
                if(result){
                    resolve(result)
                }else{
                    reject("time done")
                }
            })

            await this.carConsumer.readConsumer.run({
                eachMessage : async ({message}) => {

                    let messageKey   = message.key?.toString() as string 
                    let messageValue = message.value?.toString() as string

                    if(messageKey === key){
                        clearTimeout(timeout)
                        resolve(messageValue)
                    }else{
                        this.readMap.set(messageKey , messageValue)
                    }
                }
            })
        })
        return result;
    }
}