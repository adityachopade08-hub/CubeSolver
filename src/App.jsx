import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Play from "./pages/Play/Play";
import Learn from "./pages/Learn/Learn";
import Solve from "./pages/Solve/Solve";
import Settings from "./pages/Settings/Settings";
import Engine from "./pages/Engine/Engine";

function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Home />}
            />

            <Route
                path="/play"
                element={<Play />}
            />

            <Route
                path="/learn"
                element={<Learn />}
            />

            <Route
                path="/solve"
                element={<Solve />}
            />

            <Route
                path="/settings"
                element={<Settings />}
            />

            <Route
                path="/engine"
                element={<Engine />}
            />

        </Routes>

    );

}

export default App;