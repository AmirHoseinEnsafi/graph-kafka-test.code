import kafka from "../../../kafka";
import { Consumer } from "kafkajs";

class UserConsumer {

    public createUserConsumer !: Consumer
    public updateUserConsumer !: Consumer
    public deleteUserConsumer !: Consumer
    public readUserConsumer   !: Consumer

    constructor(){
        this.init()
    }

    public static async create(): Promise<UserConsumer> {
        const instance = new UserConsumer();
        await instance.init();
        return instance;
    }

    private async init() {
        this.createUserConsumer = await this.createUserConsumerInit();
        this.updateUserConsumer = await this.updateUserConsumerInit();
        this.deleteUserConsumer = await this.deleteUserConsumerInit();
        this.readUserConsumer   = await this.readUserConsumerInit();
    }

    private createUserConsumerInit = async () => {
        let consumer =  kafka.consumer({groupId : "createUser"})
        await consumer.connect()
        await consumer.subscribe({topic : "createUser" , fromBeginning : false})
        return consumer;
    }

    private updateUserConsumerInit = async () => {
        let consumer = kafka.consumer({groupId : "updateUser"})
        await consumer.connect()
        await consumer.subscribe({topic : "updateUser" , fromBeginning : false})
        return consumer;
    }

    private deleteUserConsumerInit = async () => {
        let consumer = kafka.consumer({groupId : "deleteUser"})
        await consumer.connect()
        await consumer.subscribe({topic : "deleteUser" , fromBeginning : false})
        return consumer ;
    }

    private readUserConsumerInit = async () => {
        let consumer = kafka.consumer({groupId : "readUser"})
        await consumer.connect()
        await consumer.subscribe({topic : "deleteUser" , fromBeginning : false})
        return consumer;
    }
}

export default UserConsumer;