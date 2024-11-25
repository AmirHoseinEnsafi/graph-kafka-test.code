import { Kafka } from 'kafkajs'

const kafka = new Kafka({
    clientId : 'testCode' ,
    brokers : ['localhost:9092'] 
})

export default kafka