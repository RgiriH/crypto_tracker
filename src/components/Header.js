import { React } from "react";
import {
    AppBar,
    Container,
    Select,
    Toolbar,
    Typography,
    MenuItem,
    makeStyles,
    ThemeProvider
} from "@material-ui/core";
import { createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { GetContext } from "../CryptoContext";
import AuthModel from "../authentication/AuthModel";
import UserSideBar from "../authentication/UserSideBar";


const useStyles = makeStyles(() => ({
    title: {
        flexBasis: "100%",
        fontFamily: "montserrat",
        fontWeight: "bolder",
        color: "gold",
        cursor : "pointer"
  },
}));

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Header = () => {
    
    const { currency ,setCurrency , symbol , user} = GetContext();
    const navigate = useNavigate()
    const classes = useStyles()

    return (
      <ThemeProvider theme={darkTheme}>
        <AppBar color="transparent" position="static">
          <Container>
            <Toolbar>
              <Typography
                className={classes.title}
                onClick={() => navigate("/")}
              >
                CRYPTO TRACKER
              </Typography>
              <Select
                variant="outlined"
                style={{
                  width: 100,
                  height: 40,
                  marginLeft: 15,
                }}
                value={currency}
              >
                <MenuItem value={"INR"} onClick={() => setCurrency("INR")}>
                  INR
                </MenuItem>
                <MenuItem value={"USD"} onClick={() => setCurrency("USD")}>
                  USD
                </MenuItem>
              </Select>
              {user ? <UserSideBar/>: <AuthModel />}
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    );
}

export default Header