import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { getAppointments } from "../../store/server";

const MeetingsList = observer(() => {
    const [localMeetingsList, setlocalMeetingsList] = useState([]);

    const updatel = async () => {
        try {
            const l = await getAppointments();
            console.log(typeof (l));
            console.log(l);
            setlocalMeetingsList(l);
            console.log(localMeetingsList);
        } catch (error) {
            console.log(error);
        }
        finally {
            console.log(localMeetingsList);
        }
    }
    useEffect(() => {
        updatel();
    }, []);

    const getMeetingColor = (meetingDate) => {
        const today = new Date();
        const formattedToday = today.toLocaleDateString('en-US',
            { month: '2-digit', day: '2-digit', year: 'numeric' });
        const WeekLater = new Date()
        WeekLater.setDate(WeekLater.getDate() + 7);
        const formattedWeekLater = WeekLater.toLocaleDateString('en-US',
            { month: '2-digit', day: '2-digit', year: 'numeric' });
        if (meetingDate == formattedToday) {
            return 'red';
        } else if (meetingDate < formattedWeekLater) {
            return 'orange';
        } else {
            return 'green';
        }
    }

    return (
        <>
            <div style={{ position: 'relative', top: '100px' }}>
                <h4>רשימת הפגישות שנקבעו עבורך:</h4>
                <div>{localMeetingsList.map((meeting, index) =>
                (<div key={index}>
                    <span style={{ fontWeight: 'bolder', color: getMeetingColor(meeting.dateTime) }}>פגישה ל{meeting.serviceType}-</span><br></br>
                   לתאריך: {meeting.dateTime}<br/>  ע"י: {meeting.clientName}<br/> טל': {meeting.clientPhone}<br/> מייל:{meeting.clientEmail}
                </div>
                ))}
                </div>
            </div>
        </>
    )
});

export default MeetingsList;





