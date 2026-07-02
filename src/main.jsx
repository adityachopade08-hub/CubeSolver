import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";
import { CubeProvider } from "./context/CubeContext";
import { CubeActionsProvider } from "./context/CubeActions";

const rootElement = document.querySelector("#root");

ReactDOM.createRoot(rootElement).render(
    <BrowserRouter>
        <CubeProvider>
            <CubeActionsProvider>
                <App />
            </CubeActionsProvider>
        </CubeProvider>
    </BrowserRouter>
);
