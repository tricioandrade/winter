import '../../css/Calculator.css';
import '../../css/Sales.css';
import {buildTemplate} from "../tasks/buildTemplate";
import {renderTemplate} from "../tasks/renderTemplate";
import saleTemplate from "../templates/saleTemplate";
import ProductsRequets from "../requests/ProductsRequets";
import SaleFormProductMannager from "../tasks/SaleFormProductMannager";


class Sales extends HTMLElement, SaleFormProductMannager {
    // private invoice = [];
    private productsForSale: any;
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        const template = buildTemplate('template', saleTemplate);
        this.shadowRoot?.appendChild(template.content.cloneNode(true));
        console.log(template);
    }

    connectedCallback() {
        if (this.isConnected) {
            this.loadProducts();
        }
    }

    private loadProducts() {
        ProductsRequets.getAllProducts().then( data => {
            console.log(data);
            this.productsForSale = data.data;
            console.log(this.productsForSale);
            new SaleFormProductMannager(data)

        }).catch( err => {
            console.log(err);
        })
    }

    render () {
        renderTemplate('sale-page');
    }
}

customElements.define('sale-page', Sales)
