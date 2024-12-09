import kafka from "../../../kafka";
import { Consumer } from "kafkajs";


class AdminConsumer {

    public appendConsumer !: Consumer
    public updateConsumer !: Consumer
    public deleteComsumer !: Consumer
    private static allowCreate : boolean = false ;
    
    constructor(){
        if(!AdminConsumer.allowCreate){
            throw new Error("use AdminConsumer.create to make instance ")
        }
    }
    
    public static async create () : Promise<AdminConsumer> {
        AdminConsumer.allowCreate = true
        const instance = new AdminConsumer()
        AdminConsumer.allowCreate = false
        await instance.init() ;
        return instance;
    }

    private async init () {
        this.appendConsumer = await this.appendConsumerInit()
        this.updateConsumer = await this.updateConsumerInit()
        this.deleteComsumer = await this.deleteConsumerInit()
    }

    private async appendConsumerInit () : Promise<Consumer> {
        const consumer = kafka.consumer({ groupId : "appendCar"})
        await consumer.connect()
        await consumer.subscribe({ topic : "appendCar" , fromBeginning : false })
        return consumer
    }

    private async updateConsumerInit () : Promise<Consumer>{
        const consumer = kafka.consumer({ groupId : "updateCar"})
        await consumer.connect()
        await consumer.subscribe({ topic : "updateCar" , fromBeginning : false })
        return consumer
    }

    private async deleteConsumerInit () : Promise<Consumer>{
        const consumer = kafka.consumer({ groupId : "deleteCar"})
        await consumer.connect()
        await consumer.subscribe({ topic : "deleteCar" , fromBeginning : false })
        return consumer
    }
}


export default AdminConsumer;