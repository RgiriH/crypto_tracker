import { React, useEffect, useState } from "react"
import { GetContext } from "../CryptoContext"
import axios from "axios"
import { CoinList } from "../config/api"
import { Container, createTheme, makeStyles, TableContainer, TextField, ThemeProvider, Typography ,LinearProgress, TableHead ,Table, TableRow, TableBody, Avatar} from "@material-ui/core";
import CssBaseline from '@mui/material/CssBaseline';
import { TableCell } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "./carousel";
import { Pagination } from "@mui/material";


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


const CoinTable = () => {
    
    const [search,setSearch] = useState("")
    const { currency, symbol, coins, loading, FectchCoins } = GetContext();
    const [page, setPage] = useState(1)
    const [count,setCount] = useState(10)
    
  

    useEffect(() => {
       FectchCoins()
    }, [currency])

    const darkTheme = createTheme({
      palette: {
        type : "dark",
      },
    });

    const handleSearch = () => {
        
        return coins.filter((coin) => {
           
            return (
              coin.name.toLowerCase().includes(search) ||
              coin.symbol.toLowerCase().includes(search)
            );

        })

    }

    const changePageCount = () => {
      if(!loading && coins.length > 0)setCount(Math.ceil(handleSearch().length / 10))
    }

    useEffect(() => {
        setPage(1)
        changePageCount()
    }, [search])

    const navigate = useNavigate()
    
    return (
      <ThemeProvider theme={darkTheme}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            background:
              "linear-gradient(00deg, rgb(36, 45, 57) 11.2%, rgb(16, 37, 50) 51.2%, rgb(0, 0, 10) 98.6%)",
          }}
        >
          <Typography
            variant="h4"
            style={{
              textAlign: "center",
              fontFamily: "montserrat",
              fontWeight: "500",
              color: "#536390",
              marginBottom: "45px",
              marginTop: "20px",
            }}
          >
            Crypto Currency Prices By Market Cap
          </Typography>
          <TextField
            label="Search for Currencies"
            variant="outlined"
            //onClick={(e) => {e.setSelectionRange(1,1)}}
            style={{
              width: "90%",
              textAlign: "center",

              margin: "0px auto",
              marginBottom: "45px",
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <TableContainer>
          {loading ? (
            <LinearProgress />
          ) : (
            <>
              <Table>
                <TableHead
                  style={{
                    backgroundColor: "#EEBC1D",
                  }}
                >
                  <TableRow>
                    {["Coin", "Price", "24h change", "Market Cap"].map(
                      (title) => {
                        return (
                          <TableCell
                            style={{
                              fontWeight: "700",
                              color: "black",
                              fontFamily: "montserrat",
                            }}
                            //align={title == "Coin" ? "" : "right"}
                            id={title}
                          >
                            {title}
                          </TableCell>
                        );
                      }
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {handleSearch()
                    .slice((page - 1) * 10, page * 10)
                    .map((row) => {
                      const profit = row?.price_change_percentage_24h >= 0;

                      return (
                        <TableRow
                          onClick={() => navigate(`/coin/${row.id}`)}
                          id={row.id}
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          <TableCell
                            style={{
                              display: "flex",
                              // justifyContent : "space-between"
                            }}
                          >
                            <Avatar
                              src={row?.image}
                              alt={row?.symbol}
                              style={{
                                padding: "auto",
                                textAlign: "center",
                                marginTop: "5px",
                                marginRight: "10px",
                              }}
                            />
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-around",
                                overflow: "hidden",
                                //textAlign : "center"
                              }}
                            >
                              <Typography>
                                {row.symbol.toUpperCase()}
                              </Typography>
                              <Typography>{row.name}</Typography>
                            </div>
                          </TableCell>
                          <TableCell
                            style={{
                              textAlign: "left",
                            }}
                          >
                            {symbol}
                            {numberWithCommas(row.current_price.toFixed(2))}
                          </TableCell>
                          <TableCell
                            style={{
                              textAlign: "left",
                              color: `${profit ? "#32de84" : "red"}`,
                            }}
                          >
                            {profit ? <>+</> : <></>}
                            {row?.price_change_percentage_24h.toFixed(2)}%
                          </TableCell>
                          <TableCell>
                            {symbol}{" "}
                            {numberWithCommas(row.market_cap.toFixed(2)).slice(
                              0,
                              -7
                            )}
                            M
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </>
          )}
          <Pagination
            count={count}
            page={page}
            variant="outlined"
            color="secondary"
            style={{
              backgroundColor: "#505050",
              padding: "15px",
              width: "100%",
              alignSelf: "center",
              display: `${coins.length == 0 ? "none" : "flex"}`,
              justifyContent: "center",
              marginRight: "auto",
            }}
            onChange={(e, p) => setPage(p)}
          />
        </TableContainer>
      </ThemeProvider>
    );
}

export default CoinTable