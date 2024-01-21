import { React } from "react"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import "./App.css"
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CoinPage from "./pages/CoinPage";
import {makeStyles} from "@material-ui/core";

function App() {

  return (
    <BrowserRouter>
      <div
        style={{
          backgroundColor: "#14161a",
          minHeight: "100vh",
          color: "white",
        }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/coin/:id" element={<CoinPage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
