import { observable, makeObservable, action } from 'mobx';

class addMeetingData {
    serviceName="";
  
    constructor() {
        makeObservable(this, {
            serviceName: observable,
            setServiceName: action,
          
            getServiceName: action
        });
    }
    setServiceName= (newName) => {
        this.servicesName=newName;
        }
        getServiceName=()=>{
        return this.serviceName;
    }
}

const AddMeetingData = new addMeetingData();
export default AddMeetingData;
