import { observable, makeObservable, action } from 'mobx';
import { addAppointment, getAppointments } from './server';
class meetingsData {
    meetingsList = [];
    meeting = {
        id: "",
        serviceType: "",
        dateTime: "",//מבנה של תאריך ושעה סטנדרטי בjs
        clientName: "",
        clientPhone: "",
        clientEmail: "",
    };
    constructor() {
        makeObservable(this, {
            meeting: observable,
            setMeeting: action,
            setMeetingsList: action,
            getMeetingsList: action
        });
    }
    setMeetingsList = (newList) => {
        this.meetingsList = newList;
    }
    setMeeting = (newMeeting) => {
        this.meeting = newMeeting;
        addAppointment()
        this.setMeetingsList(getAppointments())
    };
    getMeetingsList = () => {
        return this.meetingsList;
    }
}

const MeetingsData = new meetingsData();
export default MeetingsData;


