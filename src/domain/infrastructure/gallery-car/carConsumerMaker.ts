import kafka from "../../../kafka";
import { Consumer } from "kafkajs";

class CarConsumer {

    public readConsumer !: Consumer 
    public loadReservationConsumer !: Consumer
    private static allowCreate : boolean = false 

    constructor(){
        if(!CarConsumer.allowCreate){
            throw new Error("create the car consumer with CarConsumer.Create")
        }
    }

    public static async create () : Promise<CarConsumer> {
        CarConsumer.allowCreate = true ;
        const instance = new CarConsumer()
        CarConsumer.allowCreate = false ;
        await instance.init();
        return instance
    }

    private async init () {
        this.readConsumer = await this.readConsumerInit();
        this.loadReservationConsumer = await this.loadReservation()
    }

    private async readConsumerInit () : Promise<Consumer>{

        const consumer = kafka.consumer({ groupId : "readCar" })
        await consumer.connect()
        await consumer.subscribe({topic : "readCar" })
        return consumer
    }

    private async loadReservation () : Promise<Consumer>{

        const consumer = kafka.consumer({ groupId : "leadReservation" })
        await consumer.connect()
        await consumer.subscribe({topic : "leadReservation" })
        return consumer

    }
}

export default CarConsumer;