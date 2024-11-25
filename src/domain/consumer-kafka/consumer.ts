import kafka from "../../kafka";


const consumer = kafka.consumer({groupId : 'domain'});

(async function (){
    await consumer.connect();
    console.log(`consumer for domain is available and connected`)
})()

export default consumer;