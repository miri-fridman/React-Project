import axios from "axios";
import IsAdminStore from "./IsAdminStore"
import NameStore from "./nameStore";
import Service from "./service";


export async function checkPassword(name, password) {
    try {
        const res = await axios.post('http://localhost:8787/login', { name, password });
        console.log(res);
        if (res.status === 200) {
            IsAdminStore.setIsAdmin(true);
            return 'success';
        }
    }
    catch (error) {
        console.log(error);
        IsAdminStore.setIsAdmin(false);
        if (error.response.status === 401)
            console.log(401)
        return 'failed';
    }
}

export async function updateBusinessData(business) {
    try {
        const res = await axios.post('http://localhost:8787/businessData', { business });
        console.log(res);
        if (res.status === 200) {
            return 'success';
        }
    }
    catch (error) {
        console.log(error);
        if (error.response.status === 401)
            console.log(401)
        return 'failed';
    }
}

export async function getBusinessData() {
    try {
        const res = await axios.get('http://localhost:8787/businessData');
        console.log(res.data);
        console.log(res.statusText);
        if (res.statusText === 'OK') {
            console.log(res.data.business);
            NameStore.setBusiness(res.data.business);
            return 'success';
        }
    }
    catch (error) {
        console.log(error);
        if (error.response.status === 401)
            console.log(401)
        return 'failed';
    }
}

export async function addService(service) {
    try {
        console.log(service);
        const res = await axios.post('http://localhost:8787/service', service);
        console.log(res);
        if (res.status === 200) {
            return 'success';
        }
    }
    catch (error) {
        console.log(error);
        if (error.response.status === 401)
            console.log(401)
        return 'failed';
    }
}

export async function getServices() {
    try {
        const res = await axios.get('http://localhost:8787/services');
        console.log(res);
        if (res.statusText === 'OK') {
            console.log("V");
            Service.setServicesList(res.data);
            console.log(Service.servicesList);
            return Service.servicesList;
        }
    }
    catch (error) {
        console.log(error);
        if (error.response.status === 401)
            console.log(401)
        return 'failed';
    }
}

export async function getAppointments() {
    try {
        const res = await axios.get('http://localhost:8787/appointments');
        console.log(res.data);
        console.log(res.statusText);
        if (res.statusText === 'OK') {
            console.log(res.data);
            return res.data;
        }
    }
    catch (error) {
        console.log(error);
        if (error.response.status === 401)
            console.log(401)
        return 'failed';
    }
}

export async function addAppointment(appointment) {
    try {
        console.log(appointment);
        const res = await axios.post('http://localhost:8787/appointment', appointment);
        console.log(res);
        if (res.status === 200) {
            return 'success';
        }
    }
    catch (error) {
        console.log(error);
        if (error.response.status === 401)
            console.log(401)
        return 'failed';
    }
}