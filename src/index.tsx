import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./index.css";
import Header from "./pages/header/header";
import About from "./pages/about/about";
import Market from "./pages/market/market";
import Home from "./pages/homepage/homepage";
import Footer from "./pages/footer/footer";
import ChartPage from "./pages/chart/ChartPage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PageTemplate />}>
        <Route path="" element={<Home />} />
        <Route path="market" element={<Market />} />
        <Route path="about" element={<About />} />
        <Route path="chart/:coin/:vs" element={<ChartPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
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
