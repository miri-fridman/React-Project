import { observer } from 'mobx-react-lite';
import IsAdminStore from '../../store/IsAdminStore';
import NameStore from '../../store/nameStore';
import React, { useEffect, useState } from 'react';
import { updateBusinessData, getBusinessData } from '../../store/server';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';

const BussinesData = observer(() => {

  const [isEditing, setIsEditing] = useState(false);

  const [open, setOpen] = useState(true);

  const [localDetails, setLocalDetails] = useState({
    id: "",
    name: "",
    address: 'הרב כהנמן 53 בני ברק',
    phone: '0533156293',
    owner: "מרים פרידמן",
    logo: " ",
    description: " ",
  });

  useEffect(() => {
    setLocalDetails({
      id: NameStore.business.id,
      name: NameStore.business.name,
      address: NameStore.business.address,
      phone: NameStore.business.phone,
      owner: NameStore.business.owner,
      logo: NameStore.business.logo,
      description: NameStore.business.description,
    })
  }, [isEditing]);

  const [detailesToEdit, setDetailesToEdit] = useState({
    id: " ",
    name: '',
    address: '',
    phone: '',
    owner: '',
    logo: null,
    description: '',
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetailesToEdit((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const ariaLabel = { 'aria-label': 'description' };

  const handleSave = async () => {
    try {
      const res = await updateBusinessData(detailesToEdit);
      if (res === 'success') {
        console.log("V");
        const business = await getBusinessData();

        console.log(business);
      }
    }
    catch (error) {
      console.log("update detailes failed", error);
    }
    finally {
      setOpen(false);
      setIsEditing(false);
    }
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const text_field_style = {
    padding: "5px",
  }

  return (
    <>
      {!isEditing ? (
        <div id='business-data' style={{ position: 'absolute' }}>
          <p>{localDetails.name}</p>
          <p>{localDetails.address}</p>
          <p>{localDetails.phone}</p>
          <p>{localDetails.owner}</p>
          <p>{localDetails.description}</p>
          {IsAdminStore.isAdmin && <Button onClick={handleEdit}>עריכה</Button>}
        </div>
      ) :
        (<div>
          <Box
            component="form"
            sx={{
              background: "RGB(255,184,168)",
              border: "solid 2px #fff",
              borderRadius: "2% 2% 2% 2%"
            }}
            noValidate
            autoComplete="off"
            onChange={handleChange}
          >
            <Input name='name' placeholder="שם העסק" inputProps={ariaLabel}
              sx={{
                margin: '15px',
                height: '20px',
                fontSize: '22px',
                padding: '15px',
                color: '#fff',
              }} />
            <br />
            <Input name='address' placeholder="כתובת" inputProps={ariaLabel} sx={{
              margin: '15px',
              height: '20px',
              fontSize: '22px',
              padding: '15px',
              color: '#fff',
            }} />
            <br />
            <Input name='phone' placeholder="טלפון" inputProps={ariaLabel} sx={{
              margin: '15px',
              height: '20px',
              fontSize: '22px',
              padding: '15px',
              color: '#fff',
            }} />
            <br />
            <Input name='owner' placeholder="בעל העסק" inputProps={ariaLabel} sx={{
              margin: '15px',
              height: '20px',
              fontSize: '22px',
              padding: '15px',
              color: '#fff',
            }} />
            <br />
            <Input name='description' placeholder="תיאור" inputProps={ariaLabel} sx={{
              margin: '15px',
              height: '20px',
              fontSize: '22px',
              padding: '15px',
              color: '#fff',
            }} />
          </Box>
          <Button onClick={handleSave}>שמירה</Button>
        </div>)}
    </>
  )
});

export default BussinesData;



