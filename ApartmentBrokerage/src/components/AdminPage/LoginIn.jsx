import { checkPassword } from "../../store/server";
import IsAdminStore from "../../store/IsAdminStore";
import React, { useState } from "react";
import { TextField, Button } from '@mui/material';
import { Typography, Card, CardContent } from '@mui/material';

function LoginIn() {
  const [loginIn, setloginIn] = useState({
    name: "",
    password: ""
  });

  const [error, setError] = useState(false);

  const handllogIn = (e) => {
    const { name, value } = e.target;
    setloginIn((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignIn = async () => {
    try {
      const res = await checkPassword(loginIn.name, loginIn.password);
      if (res === 'success') {
        IsAdminStore.setIsAdmin(true);
      }
      else {
        setError(true);
      }
    }
    catch (error) {
      console.error('Error logging in:', error);
    }
    loginIn.name = "";
    loginIn.password = "";
  };

  return (
    <>
      <h1>Hello Admin</h1>
      <TextField
        size="small"
        label="שם משתמש"
        name="name"
        value={loginIn.name}
        onChange={handllogIn}
      />
      <br /><br />
      <TextField
        size="small"
        label="סיסמא"
        name="password"
        type="password"
        value={loginIn.password}
        onChange={handllogIn}
      />
      <br /><br />
      <Button variant="contained" color="secondary" size="medium" style={{ color: 'red', backgroundColor: 'pink', size: 'medium' }} onClick={handleSignIn}>הכנס</Button><br />
      {error ? (<Typography variant="h6" style={{ color: 'red', backgroundColor: 'pink', size: 'medium' }}>
        אחד מהנתונים שהוקשו שגוי!
      </Typography>
      ) : (<></>)}
    </>
  );
}

export default LoginIn;
