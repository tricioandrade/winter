import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Home from "./components/Home";
import {Inventory} from "./components/Inventory";
import '../css/style.css';
import axios from "./api/axios";
import DateAndTime from "./tasks/DateAndTime";
const DOMWindow: any = window;

DateAndTime.clock();
const admin = async () => await axios.get('/admin');
console.log(admin());
DOMWindow.admin = admin;
DOMWindow.apiHost = 'http://localhost:4000/api';
DOMWindow.appBaseUrl = 'http://localhost:8000/';

// Header();

function getPage(path: string | number): void {
    switch (path) {
        case '/home':
            Home.setPrivilegeStatus(true);
            Home.render();
            break;
        case '/users':      break;
        case '/sale':       break;
        case '/inventory':  Inventory.render()  ;      break;
        case '/receipts':   break;
    default :

        Home.setPrivilegeStatus(true);
        Home.render();
        break;
    }
}

function handleLocation():void {
    const path: string = DOMWindow.location.pathname;
    getPage(path);
}

const router = (event: Event) => {
    const handler: any = event ?? DOMWindow.event;
    handler.preventDefault();
    DOMWindow.history.pushState({}, "", handler.target.href);
    handleLocation();
};

DOMWindow.route = router;

handleLocation();
