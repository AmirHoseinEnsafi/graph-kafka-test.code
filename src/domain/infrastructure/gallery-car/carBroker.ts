import produser from "../../../kafka/produser";
import CarConsumer from "./carConsumerMaker";

class CarBroker {

    private topic   : {[key :string] : string} = {}
    private readMap : Map< string , string >
    private loadReservationMap : Map<string , string> 
    private readonly carConsumer : CarConsumer

    constructor( carConsumer : CarConsumer){
        this.topic.read            = "carReadProcessor"
        this.topic.loadReservation = "loadReservationProcessor"
        this.carConsumer           = carConsumer 
        this.readMap               = new Map< string , string >()
        this.loadReservationMap    = new Map< string , string >()
    }

    public loadResevation = async (userName : string ) => {
        const result : string = await new Promise ( async (resolve , reject) => {
            await produser.send({
                topic : this.topic.loadReservation ,
                messages : [{value : userName , key : userName}]
            })

            const timeout = setTimeout(() => {
                const result = this.readMap.get(userName) 
                if(result){
                    resolve(result)
                }else{
                    reject("time done")
                }
            })

            await this.carConsumer.loadReservationConsumer.run({
                eachMessage : async ({message}) => {

                    let messageKey   = message.key?.toString() as string 
                    let messageValue = message.value?.toString() as string

                    if(messageKey === userName){
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

export default CarBroker;