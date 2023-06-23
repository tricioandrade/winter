import {Route} from "../interfaces/Route";
import {renderTemplate} from "./renderTemplate";
import MessageBox from "../components/MessageBox";

const routes: Route = {
    '/inventory':'inventory-page',
    '/sales':'sales-page',
    '/settings':'settings-page',
    '/receipts':'receipt-page',
    '/home':'home-page',
};

export const dispatch =  (path: string) => {
    const rendered = routes[path] ? renderTemplate(routes[path]) : false;
    if (!rendered) MessageBox.openModal('Ocorreu um erro ao carregar a página');
}

