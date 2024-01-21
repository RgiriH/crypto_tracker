import { createContext ,useContext,useEffect,useState} from "react";

export const cryptoContext = createContext();

const ContextProvider = ({ children }) => {
    const [currency, setCurrency] = useState("INR")
    const [symbol, setSymbol] = useState("INR");

useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else setSymbol("$")
},[currency])
        
return (
  <cryptoContext.Provider value={{currency, setCurrency , symbol}}>
    {children}
  </cryptoContext.Provider>
);
}

export const GetContext = () => {
    return useContext(cryptoContext)
}

export default ContextProvider