import { React } from "react";
import {
  Container,
  Typography,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import Corousel from "./carousel";

const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: "url(./banner2.jpg)",
  },
  bannerContainer: {
    height: "400px",
    display: "flex",
    flexDirection: "column",
    paddingTop: "15px",
    justifyContent: "space-around",
  },
  tagLine: {
    alignContent: "center",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
  mainTitle: {
    fontWeight: "bolder",
    fontSize: "2.5rem",
    fontFamily: "montserrat",
    width: "100%",
    marginBottom: "10px",
    padding: "auto",
  },
  subTitle: {
    fontSize: "1.1rem",
    fontFamily: "sansariff",
    fontWeight : "bold",
    color: "#404050",
  },
}));

const Banner = () => {
    const classes = useStyles()
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContainer}>
        <Container className={classes.tagLine}>
          <Typography className={classes.mainTitle}>Crypto Tracker</Typography>
          <Typography className={classes.subTitle}>
            Monitor your favorate crypto currencies with cool interface
          </Typography>
              </Container>
              <Corousel></Corousel>
      </Container>
    </div>
  );
};

export default Banner;
