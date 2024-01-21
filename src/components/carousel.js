import { React, useEffect, useState } from "react"
import AliceCarousel from "react-alice-carousel"
import axios from "axios"
import { GetContext } from "../CryptoContext"
import { TrendingCoins } from "../config/api"
import { Avatar, makeStyles } from "@material-ui/core"
import "react-alice-carousel/lib/alice-carousel.css";
import {Link} from "react-router-dom"

const useStyles = makeStyles(() => ({
  mainDiv: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
  },
  carousel: {
    margin: "auto",
    alignSelf: "center",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#192734",
    borderRadius: "5px",
    margin: "25px",
    alignSelf: "center",
    padding: "8px",
    minHeight : "160px"
  },
}));

export const numberWithCommas = (x) => {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
};

const Corousel = () => {


    const responsive = {
        0: {
           items : 2
        },
        512: {
           items : 3
        },
        720 : {
            items : 4
        }
    }

    const { currency, symbol } = GetContext()
    const [trending, setTrending] = useState([])
    const classes = useStyles()

    

    const fetchTrendingCoins = async () => {
        try {
            const { data } = await axios.get(TrendingCoins(currency));
            console.log(data);
            setTrending(data);
        } catch (error) {
            //alert("SORRY..! the maximum API request reached try later");
            console.log(error.message)
        }
        
    }

    useEffect(() => {
        fetchTrendingCoins()
    }, [currency])
    
    const items = trending.map((coin) => {
        const profit = coin?.price_change_percentage_24h >= 0
        return (
          <Link to={`/coin/${coin.id}`} id={coin.id} className={classes.card}>
            <img
              src={coin.image}
              alt={coin.id}
              style={{
                maxHeight: "75px",
                maxWidth: "75px",
                alignContent: "center",
                margin: "auto",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                padding: "10px",
                fontWeight: "bolder",
                overflow : "hidden"
              }}
            >
              <span
                style={{
                     color: "white",
                    fontWeight : "bold"
                }}
              >
                {coin?.symbol.toUpperCase()}
              </span>
              <span
                style={{
                    color: `${profit ? "#32de84" : "red"}`,
                    marginLeft : "5px"
                }}
              >
                {profit ? <>+</> : <></>}
                {coin?.price_change_percentage_24h.toFixed(2)}%
              </span>
                </div>
                <div
                    style={{
                        fontWeight: "bolder",
                        fontSize: ".9rem",
                        textAlign: "center",
                        overflow : "hidden"
                    }}
                >{symbol}{numberWithCommas(coin?.current_price.toFixed(2))}</div>
          </Link>
        );
    })
    return (
        <div className={classes.mainDiv}>
            <AliceCarousel
                mouseTracking
                infinite
                autoPlay
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                items={items}
                className = {classes.carousel}
            />
        </div>
    )
}

export default Corousel