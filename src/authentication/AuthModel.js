import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Login from './Login';
import SingUp from './SignUp';
import GoogleButton from "react-google-button"
import { auth } from '../firebase';
import {GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useScrollTrigger } from '@material-ui/core';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "rgb(104,104,104)",
    border: "2px solid #000",
  borderRadius : "10px",
  boxShadow: 24,
  p: 4,
};

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

 const AuthModel = () => {
     const [open, setOpen] = React.useState(false);
     const [loading,setLoading] = React.useState(false)
  const handleOpen = () => setOpen(true);
     const handleClose = () => setOpen(false);
     
     const [value, setValue] = React.useState(0);

     const handleChange = (event, newValue) => {
       setValue(newValue);
     };
     const GoogleAuth = new GoogleAuthProvider()

     const handleClick = async () => {
         setLoading(true)
      try {
          const result = await signInWithPopup(auth, GoogleAuth)
          setLoading(false)
          console.log(result)
          handleClose()
      } catch (error) {
          alert(error.message)
          setLoading(false)
          handleClose()
      }
}

  return (
    <div
      style={{
        marginLeft: "20px",
      }}
    >
      <Button
        onClick={handleOpen}
        style={{
          height: "40px",
          backgroundColor: "gold",
          color: "black",
        }}
        variant="filled"
      >
        Login
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ borderRadius: "20px" }}
      >
        <Box sx={style}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                label="LOGIN"
                {...a11yProps(0)}
                style={{
                  width: "50%",
                  fontWeight: "700",
                  fontSize: "1.2rem",
                  color: "white",
                }}
              />
              <Tab
                label="SINGUP"
                {...a11yProps(1)}
                style={{
                  width: "50%",
                  fontWeight: "700",
                  fontSize: "1.2rem",
                  color: "white",
                }}
              />
            </Tabs>
            <CustomTabPanel value={value} index={0}>
              <Login handleClose={handleClose} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <SingUp handleClose={handleClose} />
            </CustomTabPanel>
          </Box>
          <span
            style={{
              width: "100%",
              height: "40px",
              display: "block",
              textAlign: "center",
              fontWeight: "600",
              marginTop: "5px",
            }}
          >
            OR
          </span>
          <GoogleButton
            style={{
              textAlign: "center",
              fontWeight: "600",
              margin: "auto",
              width: "100%",
            }}
                      onClick={handleClick}
                      disabled = {loading}
          ></GoogleButton>
        </Box>
      </Modal>
    </div>
  );
}

export default AuthModel