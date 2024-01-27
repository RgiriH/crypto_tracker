import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { CoinList } from "./config/api";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

export const cryptoContext = createContext();

const ContextProvider = ({ children }) => {
  const [currency, setCurrency] = useState("INR")
  const [symbol, setSymbol] = useState("INR");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user,setUser] = useState(null)

   const FectchCoins = async () => {
     setLoading(true);

     try {
       const { data } = await axios.get(CoinList(currency.toLowerCase()));
       console.log(data);
       setCoins(data);
       setLoading(false);
     } catch (error) {
       //alert("SORRY..! the maximum API request reached try later")
       console.log(error);
       setLoading(false);
     }
   };

useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else setSymbol("$")
}, [currency])
  
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) setUser(user)
      else setUser(null)
      })
  },[])
        
return (
  <cryptoContext.Provider value={{currency, setCurrency , symbol,coins,loading,FectchCoins,user}}>
    {children}
  </cryptoContext.Provider>
);
}

export const GetContext = () => {
    return useContext(cryptoContext)
}

export default ContextProvider