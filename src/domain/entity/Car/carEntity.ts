import CarInterface from "./carinterface";


class Car implements CarInterface {

    companyName: string;
    carName: string;
    engineDetail: string;
    model: number;
    price: number;

    constructor(dto : CarInterface){
        this.companyName = dto.companyName
        this.carName = dto.carName
        this.engineDetail = dto.engineDetail
        this.model  = dto.model
        this.price = dto.price
    }
}

export default Car;