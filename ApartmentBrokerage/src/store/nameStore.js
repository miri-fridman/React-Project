import { observable, makeObservable, action } from 'mobx';
import { updateBusinessData, getBusinessData } from './server'

class nameStore {
    business = {
        id: " ",
        name: "תיווך דירות ",
        address: 'הרב כהנמן 53 בני ברק',
        phone: '1700-75-75-75',
        owner: "יוסף בלוי",
        logo: " ",
        description: "סיוע והדרכה במכירת וקניית דירות בכל קצוות העיר ",
    };

    constructor() {
        makeObservable(this, {
            business: observable,
            setBusiness: action,
        });
        const b = getBusinessData()
        if (b) {
            updateBusinessData(this.business);
        }
        this.business = getBusinessData();
    }

    setBusiness = (newBusiness) => {
        this.business = newBusiness;
    };
}

const NameStore = new nameStore();
export default NameStore;


