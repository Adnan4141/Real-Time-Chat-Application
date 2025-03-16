import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { store } from "./redux-rtk-query/store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     <Toaster position="top-center"/>
       <Provider store={store}>
        <App/>
       </Provider>
  </React.StrictMode>
);
