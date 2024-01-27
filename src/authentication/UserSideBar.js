import { React, useState } from "react"
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";
import { GetContext } from "../CryptoContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const UserSideBar = () => {
    const [state, setState] = useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });

    const {user} = GetContext()

    const toggleDrawer = (anchor, open) => (event) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const logout = () => {
      signOut(auth)
      toggleDrawer()
  }
    return (
      <div>
        {["right"].map((anchor) => (
          <>
            <Avatar
              onClick={toggleDrawer(anchor, true)}
              style={{
                marginLeft: "20px",
                height: "40px",
                cursor: "pointer",
                backgroundColor: "gold",
              }}
              src={user.photoURL}
              alt={user?.email}
            />
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              <div
                style={{
                  width: 350,
                  height: "100%",
                  backgroundColor: "#808080 ",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    justifyContent: "center",
                    height: "30%",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    onClick={toggleDrawer(anchor, true)}
                    style={{
                      height: "60%",
                      width: "40%",
                      backgroundColor: "gold",
                      color: "black",
                    }}
                    src={user.photoURL}
                    alt={user.displayName || user?.email}
                  />
                  <span
                    style={{
                      textAlign: "center",
                      fontWeight: "600",
                      fontSize: "1.5rem",
                      marginTop: "20px",
                      color: "rgb(190,190,190)",
                    }}
                  >
                    {user.displayName || user.email}
                  </span>
                </div>
                <div
                  style={{
                    height: "65%",
                    width: "90%",
                    backgroundColor: "#4f666a",
                    color: "black",
                    padding: "20px",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      height: "10%",
                      width: "100%",
                      color: "black",
                      //padding: "20px",
                        textAlign: "center",
                        fontWeight: "600",
                        fontSize: "1.5rem",
                        paddingBottom: "5px"
                      
                    }}
                  >
                    Watch List
                  </span>
                  <div
                    style={{
                      height: "90%",
                      width: "100%",
                      overflow : "auto",
                      color: "black",
                      padding: "20px",
                      borderRadius: "10px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  ></div>
                </div>
                <Button
                  variant="contained"
                  style={{
                    width: "90%",
                    height: "50px",
                    alignSelf: "center",
                    backgroundColor: "red",
                    cursor: "pointer",
                    marginTop: "auto",
                    padding: "20px",
                    marginBottom: "20px",
                  }}
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            </Drawer>
          </>
        ))}
      </div>
    );
}

export default UserSideBar