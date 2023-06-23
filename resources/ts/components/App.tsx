import React from "react";
import Home from "./home/Home";
import {Routes, Route} from "react-router-dom";
import Sales from "./sale/Sales";
import {Inventory} from "./inventory/Inventory";
import Receipts from "./receipt/Receipts";
import './App.css';
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
            <Route path="/receipts" element = {<Receipts/>} />
        </Routes>
    );
}

export default App;
