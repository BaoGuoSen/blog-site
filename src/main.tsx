import { render } from "react-dom";
import { useRoutes, BrowserRouter } from "react-router-dom";

import "./main.less";
import routers from "./router";
import useTimeout from "./hooks/useTimeout";
import { countWeb } from "./service/common";

const Index = () => useRoutes(routers);

const App = () => {
  useTimeout(() => countWeb(), 5 * 1000);

  return (
    // <React.StrictMode>
    <BrowserRouter>
      <Index />
    </BrowserRouter>
    // </React.StrictMode>
  );
};

render(<App />, document.getElementById("blog-app")!);