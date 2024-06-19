import React, { useState, useEffect } from "react";
import { observer } from 'mobx-react-lite';
import ServicesList from './ServicesList';
import Service from "../../store/service";
import { addService, getServices } from "../../store/server";
import { TextField, Button, Typography, Card, CardContent } from '@mui/material';

const AddService = observer(() => {
  const [open, setOpen] = useState(true);
  const [error, setError] = useState(false);
  const [localService, setLocalService] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    duration: ""
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalService((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const res = await addService(localService);
      if (res === 'success') {
        console.log("update success");
        const list = await getServices();
        console.log(list);
      }
      else {
        setError(true);
      }
    } catch (error) {
      console.log("error in add service", error);
    }
    finally {
      setOpen(false);
    }
  }

  const handleClickOK = () => {
    setError(false)
  }

  return (<>
    {open && <div>
      <TextField
        label="id"
        name="id"
        onChange={handleChange}
      /><br />
      <TextField
        label="שם"
        name="name"
        onChange={handleChange}
      /><br />
      <TextField
        label="תיאור"
        name="description"
        onChange={handleChange}
      />
      <br />
      <Button onClick={handleSave}>שמירה</Button>

    </div>}

    {error && <p>השירות לא נוסף, קיים שירות זהה במערכת  
      <Button onClick={handleClickOK}>אישור</Button></p>}
  </>)
});

export default AddService;

