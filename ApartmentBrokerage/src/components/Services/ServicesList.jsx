import React, { useState, useEffect, useRef } from 'react';
import Service from "../../store/service";
import { observer } from 'mobx-react-lite';
import IsAdminStore from '../../store/IsAdminStore';
import { addService, getServices } from "../../store/server";
import { Button } from '@mui/material';
import { Link, Outlet } from "react-router-dom";
import './AddService';
import AddMeeting from '../Meetings/AddMeeting'
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';

const ServicesList = observer(() => {
  const [anchor, setAnchor] = React.useState(null);
  const handleClick = (event) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const open = Boolean(anchor);

  const id = open ? 'simple-popup' : undefined;

  const [mapInitialized, setMapInitialized] = useState(false);

  const [showAddService, setShowAddService] = useState(false);

  const [localServices, setLocalServices] = useState([{
    id: "",
    name: "",
    description: "",
    price: "",
    duration: ""
  }]);

  const updatel = async () => {
    try {
      var l = await getServices();
      console.log(l);
      setLocalServices(l);
      console.log(localServices);
    } catch (error) {
      console.log(error);
    }
    finally {
      console.log(localServices);
    }
  }

  useEffect(() => {
    updatel();
  }, [showAddService]);

  const addService = async () => {
    setShowAddService(!showAddService);
  };

  const path = './addService'
  return (
    <>
      <div style={{ position: 'relative', top: '100px' }}>
        <h1>שירותי העסק</h1>
        <div>{localServices.map((service, index) =>
        (<div key={index}>
          <span style={{ fontWeight: 'bolder' }}>#{service.name}-</span>
          {service.description} {service.price}
          <div>
            {!IsAdminStore.isAdmin && <><Button aria-describedby={id} type="button" onClick={handleClick}>
              זימון פגישה</Button>
              <BasePopup id={id} open={open} anchor={anchor}>
                <><AddMeeting></AddMeeting></>
              </BasePopup></>}
          </div>
        </div>))}
        </div>
        {IsAdminStore.isAdmin && !showAddService ?
          (<><Link to={path}>הוסף שירות</Link >
            <Outlet /></>)
          : (<></>)}
      </div>
    </>
  )
});

export default ServicesList;
