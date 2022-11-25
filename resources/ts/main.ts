import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./components/Home";
import  "./components/Inventory";
import '../css/app.css';
import {renderTemplate} from "./traits/renderTemplate";
import {Router, Route} from "typescript-router";
// import axios from "./api/axios";
// import DateAndTime from "./traits/DateAndTime";

// DateAndTime.clock();
// const admin = async () => await axios.get('/admin');
// console.log(admin());
// DOMWindow.admin = admin;
// DOMWindow.apiHost = 'http://localhost:4000/api';
// DOMWindow.appBaseUrl = 'http://localhost:8000/';

const router = Router(
    {
        home: Route('/home'),
        inventory: Route('/inventory'),
        receipt: Route('/receipt'),
        settings: Route('/settings')
    },
    {onNotFound}
);

function onNotFound() {
    console.log(router);
}

switch (router.route.name) {
    case "home":        renderTemplate('home-page');break;
    case "receipt":     renderTemplate('receipt-page'); break;
    case "settings":    renderTemplate('settings-page'); break;
    case "notFound":    renderTemplate('home-page'); break;
    case "inventory":   renderTemplate('inventory-page'); break;
    default :           renderTemplate('home-page');
}

// Header();
//
// function getPage(path: string | number): void {
//
// }
//
// function handleLocation():void {
//     const path: string = DOMWindow.location.pathname;
//     getPage(path);
//     console.log(path);
// }
//
// const router = (event: any = HTMLElement) => {
//     const handler = event ?? window.event as Event;
//     handler.pre;
//     const target = handler?.target as HTMLAnchorElement;
//     DOMWindow.history.pushState({}, "", target.href);
//     handleLocation();
// };
//
// DOMWindow.route = router;
//
// handleLocation();
