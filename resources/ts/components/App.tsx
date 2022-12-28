import React from "react";
import Home from "./home/Home";
import {Routes, Route} from "react-router-dom";
import Sales from "./sale/Sales";
import {Inventory} from "./inventory/Inventory";

const App = () => {
    return (
        <Routes>
            <Route path="/" element = { <Home/> } />
            <Route path="/home" element = { <Home/> } />
            <Route path="/sales" element = { <Sales/> } />
            <Route path="/inventory">
                <Route index element = { <Inventory/> }/>
                <Route path=":page" element = { <Inventory/> }/>
            </Route>
        </Routes>
    );
}

export default App;
