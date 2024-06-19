import LoginIn from "./LoginIn";
import BussinesData from "../BusinessDate/BusinessData";
import IsAdminStore from "../../store/IsAdminStore";
import React from "react";
import { observer } from "mobx-react-lite";
import { Link, Outlet } from "react-router-dom";


const AdminHome = observer(() => {
  return (
    <>
      {!IsAdminStore.isAdmin ?
        <LoginIn /> :
        (<div >
          <BussinesData />
          <span
            style={{
              position: "relative", top: '80px'
            }}
          >
            <Link to="./services" style={{ padding: '1rem', margin: '1rem', }}>שירותי העסק</Link >
            <Link to="./meetings">פגישות</Link >
            <br />
            <Outlet /></span>
        </div>
        )}
    </>
  );
});

export default AdminHome;
