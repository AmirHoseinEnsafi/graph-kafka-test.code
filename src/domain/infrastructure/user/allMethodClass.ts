import userAndAdmininterface from '../../entity/userAndAdmin/interfaceUserEntity'
import kafka from '../../../kafka'
import produser from '../../../kafka/produser'
import { v4 as uuid } from 'uuid'

let consumer = kafka.consumer({groupId : 'UserInfrastructure'});

(async function (){
    await consumer.subscribe({topic : /^domainUser/ , fromBeginning : false})
    await consumer.connect()
})()

class UserInfrastructure{
    savedDetail: Map< string , string>

    constructor () {
        this.savedDetail = new Map()
    }

    createUser = async (dto : userAndAdmininterface) : Promise<userAndAdmininterface | string> => {
        const id = uuid()

        const dtoInJson = JSON.stringify(dto)
        await produser.send({
            topic : 'createUser' ,
            messages : [{key : id , value : dtoInJson}]
        })

        const result = new Promise<userAndAdmininterface | string>((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject('thime is done something goes wrong')
            } , 5000)
            
            if(!this.savedDetail.has(id)){
                consumer.run({
                    eachMessage : async ({ topic , message}) => {
                        const {key , value} = message as any

                        if(topic === "domainUserCreated"){

                            if(key === id){
                                resolve(value)
                            }else{
                            this.savedDetail.set(key, value)
                            }

                        }else{
                            this.savedDetail.set(key, value)
                        }
                    }
                })
            }else{
                const userJsonOrString = this.savedDetail.get(id) as string
                try {
                    let result = JSON.parse(userJsonOrString)
                    resolve(result)
                } catch (error) {
                    resolve(userJsonOrString)
                }
            }
        })

        return await result;
    }
}