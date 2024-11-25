import kafka from './index'

const produser = kafka.producer();

(async function (){
    await produser.connect();
    console.log(`produser connected`)
})()

export default produser;