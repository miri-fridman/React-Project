import React from "react";
import BussinesDetails from "../BusinessDate/BusinessData"; 
import ServicesList from "../Services/ServicesList"
function UserHome(){
    return(
        <>
        <div>
        <BussinesDetails/>
        <ServicesList/>
        </div>
        </>
    )
}
export default UserHome;