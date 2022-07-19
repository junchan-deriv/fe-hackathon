import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Main from "./pages/main";
import Header from "./pages/header/header";
import About from "./pages/about/about";
import Market from "./pages/market/market";
import Home from "./pages/homepage/homepage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
let page = <></>;
switch (document.location.pathname) {
  case "/":
    page = <Home />;
    break;

  case "/market":
    page = <Market />;
    break;
  case "/about":
    page = <About />;
    break;
}
root.render(
  <>
    <Header />
    {page}
  </>
  // <React.StrictMode>
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path="/" element={<nav />} />
  //     </Routes>
  //   </BrowserRouter>
  // </React.StrictMode>
);
