import React from "react";
import Home from "../components/Home";
import {Routes, Route} from "react-router-dom";
import Sales from "../components/Sales";
import {Inventory} from "../components/Inventory";

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
