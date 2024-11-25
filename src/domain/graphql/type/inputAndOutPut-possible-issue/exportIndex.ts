import importIndex from "./importIndex";
import adminITSelf from "./admin/adminITSelf";
import carManagement from "./admin/carManagement";
import customerItSelf from "./customerAndAdmin/customerItSelf";
import customerReservation from "./customerAndAdmin/customerReservation";
import findByName from "./gallery/findByName";
import findByPrice from "./gallery/findByPrice";


export default `${importIndex} ${adminITSelf} ${carManagement} ${customerItSelf} ${customerReservation} ${findByName} ${findByPrice}`