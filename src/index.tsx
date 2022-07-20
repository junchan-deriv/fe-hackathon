import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./index.css";
import Header from "./pages/header/header";
import About from "./pages/about/about";
import Market from "./pages/market/market";
import Home from "./pages/homepage/homepage";
import Footer from "./pages/footer/footer";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
// let page = <></>;
// switch (document.location.pathname) {
//   case "/":
//     page = <Home />;
//     break;

//   case "/market":
//     page = <Market />;
//     break;
//   case "/about":
//     page = <About />;
//     break;
// }
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageTemplate />}>
          <Route path="" element={<Home />} />
          <Route path="market" element={<Market />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

function PageTemplate(): JSX.Element {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
