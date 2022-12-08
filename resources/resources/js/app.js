import './bootstrap';
import '../../css/fonts/fonts.css';
import '../../css/css/app.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/js/all.min';
import axios from "../../ts/api/axios";
import Sales from "../../ts/components/Sales";
import {Root} from "../../ts/tasks/Root";
import Home from "../../ts/components/Home";
import "./routes/Core";
import Inventory from "../../ts/components/Inventory";
import ProductListShowID from "../../ts/components/ProductsListShowID";
import Preloader from "../../ts/tasks/Preloader";
import ProductList from "../../ts/components/ProductsList";
import Users from "../../ts/components/Users";
import Receipts from "../../ts/components/Receipts";
import '../../css/app.css';
import ChangeUserPassword from "../../ts/tasks/ChangeUserPassword";
import MessageBox from "../../ts/components/MessageBox";
import Cookie from "../../ts/tasks/Cookie";
import DateAndTime from "../../ts/tasks/DateAndTime";

DateAndTime.clock();
const admin = async () => await axios.get('/admin');
console.log(admin());
window.admin = admin;
window.apiHost = 'http://localhost:4000/api';
window.appBaseUrl = 'http://localhost:8000/';

const cookie  = new Cookie();

window.changePassword =  async () => {
        try {
            const user = await axios.get('user/');
            console.log('user: ', user);
            const check = await axios.get('login-check-times/');
            console.log('check: ', check);

            if (!check.data[0]?.user_id){
                ChangeUserPassword();
                const form = document.getElementById('ChangeUserPassword');
                form.addEventListener('submit', async ev => {
                    ev.preventDefault();
                    Preloader().active();
                    const formData = new FormData();

                    formData.append('password', form.changePassword.value);

                    const response = await axios.post('update-password/' + user.data.id, formData);
                    console.log(response);

                    document.getElementById('modal-password').remove();
                    document.querySelector('main').style.visibility = 'visible';

                    MessageBox('Senha alterada com sucesso!');
                    cookie.setCookie('passwordChange', 'yes', 20);
                    Preloader().remove();

                });
            }
        }catch (e) {
            console.log(e);
        }
};




const preloader = document.querySelector('.preloader');

function go (path) {

   changePassword();

    switch (path) {
        case 'inventory':

            admin().then(
                data => {
                    if (data.data[0].id) {
                const inventory = new Inventory();
                Root(inventory.render());
                ProductListShowID().then(r => {
                    document.getElementById('product_id').innerHTML = r;
                    document.querySelector('.product_list').innerHTML = r;
                    Preloader().remove();
                }).catch(err => {
                    Preloader().remove();
                });

                inventory.main();
                        }});
            break;
        case 'sales':
                const sale = new Sales();
                Root(sale.render());
                sale.saleFormProduct();

                ProductList().then(r => {
                    document.getElementById('productList').innerHTML = r;
                    Preloader().remove();
                });
            break;
        case 'users':
            const user = new Users();
            admin().then(
                data => {
                    if (data.data[0].id) {

                        Root(user.render());
                    user.main();
                }});
            break;
        case 'receipts':
            const receipt = new Receipts()

            admin().then(
                data => {
                    if (data.data[0].id) {
                        Root(receipt.render());
                        receipt.main();
                    }});
            break;
        case 'home':
            Root(Home());

            admin().then(
                data => {
                    console.log(data);

                    if (data.data[0].id){
                        document.getElementById('request-component').innerHTML +=`

                                `;
                    }
                }
            );

            break;
        default:
            Root(Home());
    }

    if (preloader){
        preloader.classList.remove('.active');
    }

}


const router = (event) => {
    event = window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

const routes = {
    '/inventory': 'inventory',
    '/sales': 'sales',
    '/users': 'users',
    '/receipts': 'receipts',
    '/home': 'home'
};

function handleLocation () {
    const path = window.location.pathname;

    const route = routes[path] || routes[404];
    console.log(route);
    go(route);
};

window.onpopstate = handleLocation;
window.route = router;

handleLocation();





