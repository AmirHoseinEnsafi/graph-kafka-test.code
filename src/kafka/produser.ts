import kafka from './index'

const produser = kafka.producer();

(async function (){
    await produser.connect();
})()

export default produser;