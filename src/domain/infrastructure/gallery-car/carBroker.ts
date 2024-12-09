import { Consumer } from "kafkajs";
import produser from "../../../kafka/produser";
import CarConsumer from "./carConsumerMaker";

class CarBroker {

    public topic   : {[key :string] : string} = {}
    public readMap : Map< string , string >
    private readonly carConsumer : CarConsumer

    constructor( carConsumer : CarConsumer ){
        this.topic.read  = "carReadProcessor"
        this.carConsumer = carConsumer 
        this.readMap     = new Map< string , string >()
    }

    public read = async () => {

    }
}