import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import AddMeetingData from "../../store/addMeetingData";
import { Box } from "@mui/material";
import { Button } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Input from '@mui/material/Input';
import { addAppointment, getAppointments } from "../../store/server";

function AddMeeting() {
  const [ServiceName, setServiceName] = useState("")
  const [open, setOpen] = useState(true);
  const [error, setError] = useState(false);
  const [currentMeeting, setCurrentMeeting] = useState({
    id: "",
    serviceType: "",
    dateTime: "",
    clientName: "",
    clientPhone: "",
    clientEmail: "",
  });

  const ariaLabel = { 'aria-label': 'description' };

  const updateName = async () => {
    try {
      var name = await AddMeetingData.getServiceName()
      setServiceName(name)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    updateName();
  }, []);

  const handlChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'dateTime' ? JSON.stringify(value) : value;
    setCurrentMeeting((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleSave = async () => {
    try {
      const res = await addAppointment(currentMeeting);
      if (res === 'success') {
        console.log("update success");
        const list = await getAppointments();
        console.log(list);
        setOpen(false);
      }
      else {
        setError(true);
      }
    } catch (error) {
      console.log("error in add meeting", error);
    }
    finally {
      setOpen(false);
    }
  }

  const handleClickOK = () => {
    setError(false)
  }

  return (
    <>
      {open && (
        <Box
          component="form"
          sx={{
            background: "RGB(255,184,168)",
            border: "solid 2px #fff",
            borderRadius: "2% 2% 2% 2%"
          }}
          noValidate
          autoComplete="off"
          onChange={handlChange}
        >
          <Input name='serviceType' placeholder="סוג השירות" inputProps={ariaLabel}
            sx={{
              margin: '15px',
              height: '20px',
              fontSize: '22px',
              padding: '15px',
              color: '#fff',
            }} />
          <br />
          <Input name='clientName' placeholder="שם" inputProps={ariaLabel} sx={{
            margin: '15px',
            height: '20px',
            fontSize: '22px',
            padding: '15px',
            color: '#fff',
          }} />
          <br />
          <Input name='clientPhone' placeholder="טלפון" inputProps={ariaLabel} sx={{
            margin: '15px',
            height: '20px',
            fontSize: '22px',
            padding: '15px',
            color: '#fff',
          }} />
          <br />
          <Input name='clientEmail' placeholder="מייל" inputProps={ariaLabel} sx={{
            margin: '15px',
            height: '20px',
            fontSize: '22px',
            padding: '15px',
            color: '#fff',
          }} />
          <br />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker']}>
              <DateTimePicker name='dateTime' label="בחר תאריך ושעה" />
            </DemoContainer>
          </LocalizationProvider>
          <Button onClick={handleSave}>שמירה</Button>
        </Box>)
      }
      {error && <p> התאריך המבוקש תפוס, יש לבחור תאריך אחר.<Button onClick={handleClickOK}>אישור</Button></p>}
    </>
  );
}
export default AddMeeting;