import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import '@fortawesome/fontawesome-free/css/all.min.css';
import  "./components/Home";
import  "./components/Inventory";
import '../css/app.css';
import "./components/Sale";
import "./components/Home";
import {dispatch} from "./traits/Route";

dispatch(window.location.pathname);

