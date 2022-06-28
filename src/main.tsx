import React from "react";
import ReactDOM from "react-dom/client";
import { useRoutes, BrowserRouter } from "react-router-dom";

import "./main.less";
import routers from "./router";

const Index = () => useRoutes(routers);

const App = () => (
  // <React.StrictMode>
  <BrowserRouter>
    <Index />
  </BrowserRouter>
  // </React.StrictMode>
);
ReactDOM.createRoot(document.getElementById("root")!).render(<App />);