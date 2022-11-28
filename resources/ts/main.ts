import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./components/Home";
import  "./components/Inventory";
import '../css/app.css';
import {renderTemplate} from "./traits/renderTemplate";
// import axios from "./api/axios";
// import DateAndTime from "./traits/DateAndTime";

// DateAndTime.clock();
// const admin = async () => await axios.get('/admin');
// console.log(admin());
// DOMWindow.admin = admin;
// DOMWindow.apiHost = 'http://localhost:4000/api';
// DOMWindow.appBaseUrl = 'http://localhost:8000/';
//
// const router = Router(
//     {
//         home: Route('/home'),
//         sales: Route('/sales'),
//         inventory: Route('/inventory'),
//         receipt: Route('/receipt'),
//         settings: Route('/settings')
//     },
//     {onNotFound}
// );
//
// function onNotFound() {
//     console.log(router);
// }


// Header();
//
function getPage(path: string | number): void {

    switch (path) {
        case "home":        renderTemplate('home-page');break;
        case "receipt":     renderTemplate('receipt-page'); break;
        case "settings":    renderTemplate('settings-page'); break;
        case "notFound":    renderTemplate('home-page'); break;
        case "inventory":   renderTemplate('inventory-page'); break;
        default :           renderTemplate('home-page');
    }
}

function handleLocation():void {
    const path: string = window.location.pathname;
    getPage(path);
    console.log(path);
}
console.log(Event);
console.log(EventTarget);
const router = () => {
    document.addEventListener('click', ev => {
        console.log(ev.target?.);
        ev.target.addEventListener('cl')
        ev.preventDefault();
        ev.stopImmediatePropagation();

    });
    // console.log(handler);
    // const target = handler?.target;
    // const element = handler as HTMLAnchorElement;
    // console.log(element);
    // window.history.pushState({}, "", element.href);
    // handleLocation();
};

//@ts-ignore
window.route = router;

handleLocation();
