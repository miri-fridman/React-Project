import { observable, makeObservable, action } from 'mobx';
import { addService, getServices } from './server';
class service {
    servicesList = [];
    service = {
        id: "",
        name: "",
        description: "",
        price: null,
        duration: null,
    };
    constructor() {
        makeObservable(this, {
            service: observable,
            setService: action,
            setServicesList: action,
            getServicesList: action
        });
    }
    setServicesList = (newList) => {
        this.servicesList = newList;
    }
    setService = (newService) => {
        this.service = newService;
        addService();
        this.setServicesList(getServices())
    };
    getServicesList = () => {
        return this.servicesList;
    }
}

const ServiceData = new service();
export default ServiceData;




