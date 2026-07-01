import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

import { CubeProvider } from "./context/CubeContext";

ReactDOM.createRoot(document.getElementById("root")).render(

    <BrowserRouter>

        <CubeProvider>

            <App />

        </CubeProvider>

    </BrowserRouter>

);