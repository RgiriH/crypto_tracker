import { React , useEffect, useState} from "react"
import { GetContext, cryptoContext } from "../CryptoContext";
import axios from "axios"
import { HistoricalChart } from "../config/api";
import { ThemeProvider, createTheme, makeStyles, CircularProgress ,Button} from "@material-ui/core";
import Chart, { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale,Title,Tooltip);

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "30px",
    marginTop: "20px",
    width: "70%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  Chart: {
    width : "100%",
    [theme.breakpoints.up("md")]: {
      marginTop: "15%",
    },
    
  },
}));


const CoinChat = ({ coin }) => {
    const darkTheme = createTheme({
      palette: {
        type : "dark",
      },
    });
    const [historicalData, setHistoricalData] = useState(null)
    const [days, setDays] = useState(1);
    const { currency, symbol } = GetContext()
    
    const FetchHistory = async () => {
        try {
            const { data } = await axios.get(
              HistoricalChart(coin?.id, days, currency)
            );
          console.log("data", data.prices);
          
            setHistoricalData(data.prices);
        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect(() => {
         FetchHistory()
    }, [currency, days])
  
  
  
  const classes = useStyles()
    return (
      <ThemeProvider theme={darkTheme}>
        <div className={classes.container}>
          {!historicalData ? (
            <CircularProgress
              style={{
                color: "gold",
                margin: "auto",
                padding: "30px",
              }}
              size={250}
              thickness={1}
            />
          ) : (
            <Line
              className={classes.Chart}
              style={{
                //width: "80vh",
                display: "flex",
                //height : "70%",
                justifyContent: "center",
                //backgroundColor : "white"
                //marginTop: "25%"
              }}
              data={{
                labels: historicalData.map((coin) => {
                  let date = new Date(coin[0]);

                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} AM`
                      : `${date.getHours()}:${date.getMinutes()} PM`;

                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    label: `price (in past ${days}) in ${currency}`,
                    data: historicalData.map((coin) => coin[1]),
                    borderColor: "gold",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "20px",
              marginTop: "30px",
            }}
          >
            <Button
              variant={days === 1 ? "contained" : "outlined"}
              onClick={() => setDays(1)}
              style={{
                backgroundColor: `${days === 1 ? "gold" : ""}`,
                width: "30%",
              }}
            >
              Last 24H
            </Button>
            <Button
              variant={days === 30 ? "contained" : "outlined"}
              onClick={() => setDays(30)}
              style={{
                backgroundColor: `${days === 30 ? "gold" : ""}`,
                width: "30%",
              }}
            >
              Last 30D
            </Button>
            <Button
              variant={days === 365 ? "contained" : "outlined"}
              onClick={() => setDays(365)}
              style={{
                backgroundColor: `${days === 365 ? "gold" : ""}`,
                width: "30%",
              }}
            >
              Last 1Y
            </Button>
          </div>
        </div>
      </ThemeProvider>
    );
}

export default CoinChat