import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import  "./components/Home";
import  "./components/Inventory";
import '../css/css/app.css';
import '../css/app.css';
import '../css/fonts/fonts.css';
import '../css/Home.css';
import "./components/Sale";
import "./components/Home";
import {dispatch} from "./traits/Route";



const openUrl = () => dispatch(window.location.pathname);


openUrl();
window.onpopstate = openUrl;
