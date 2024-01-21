import axios from "axios";
import { React, useEffect, useState } from "react";
import {useParams} from "react-router-dom"
import { SingleCoin } from "../config/api";
import { LinearProgress, Typography, makeStyles } from "@material-ui/core"
import CoinChat from "../components/CoinChat";
import { GetContext } from "../CryptoContext";
import { numberWithCommas } from "../components/carousel";
import ReactHtmlParser from "react-html-parser"

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    display: "flex",
    flexDirection: "row",
  },
  sideBar: {
    width: "40%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRight: "2px solid white",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      borderRight: "none",
    },
  },
}));

const CoinPage = () => {
  const { id } = useParams()
  const [coin, setCoin] = useState(null)
  const [loading, setLoading] = useState(false)
  const {currency , symbol } = GetContext()
  const FetchCoin = async() => {
      setLoading(true)
    try {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
      console.log(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  

  const classes = useStyles()

  useEffect(() => { FetchCoin() }, [])
  
  if (loading || !coin) return <LinearProgress/>
  return (
    <div className={classes.container}>
      <div className={classes.sideBar}>
        <img
          src={coin?.image?.large}
          alt={coin?.name}
          style={{
            width: "120px",
            height: "120px",
            marginTop: "20px",
            overflow: "hidden",
            padding: "10px",
          }}
        />
        <Typography
          variant="h3"
          style={{
            textAlign: "center",
            fontFamily: "-moz-initial",
            color: "#778899",
            fontWeight: "700",
          }}
        >
          {coin?.name}
        </Typography>
        <Typography
          variant="h6"
          style={{
            fontFamily: "cursive",
            color: "#778899",
            padding: "20px",
            overflowY: "auto",
            maxHeight: "350px",
            marginBottom: "20px",
            marginTop : "15px",
            borderRadius : "3px"
          }}
        >
          {ReactHtmlParser(coin?.description?.en?.split(". "))}
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
            width: "100%",
            padding: "00px 20px 20px 20px",
            fontFamily: "montserrat",
            fontWeight: "600",
            //backgroundColor : "white"
            fontSize: "1.5rem",
            gap: "10px",
            overflow: "hidden",
            "scrollbar-width": "none",
            "-webkit-scrollbar" : {
                display: "none",
              }
          }}
        >
          <span>
            Rank :{" "}
            <span
              style={{
                fontWeight: "300",
                color: "gold",
              }}
            >
              {coin?.market_cap_rank}
            </span>
          </span>
          <span>
            Current Price :{"  "}
            <span
              style={{
                fontWeight: "300",
                color: "gold",
              }}
            >
              {symbol + " "}
              {numberWithCommas(
                coin?.market_data?.current_price[
                  currency?.toLowerCase()
                ]?.toFixed(2)
              )}
            </span>
          </span>
          <span>
            Market Cap :{"  "}
            <span
              style={{
                fontWeight: "300",
                color: "gold",
              }}
            >
              {symbol + " "}
              {numberWithCommas(
                coin?.market_data?.market_cap[currency?.toLowerCase()]
              )?.slice(0,-7)}M
            </span>
          </span>
        </div>
      </div>
      {<CoinChat coin = {coin} />}
    </div>
  );
};

export default CoinPage;
