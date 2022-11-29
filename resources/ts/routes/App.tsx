import React from "react";
import Home from "../components/Home";
import {Routes, Route} from "react-router-dom";

const App = () => {


    return (
        <Routes>
            <Route path="/" element = { <Home/> } />
            <Route path="/home" element = { <Home/> } />
            <Route path="/sales" element = { <Sale/> } />
        </Routes>
    );
}

export default App;
