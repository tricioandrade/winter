import '../../css/Calculator.css';
import '../../css/Sales.css';
import {buildTemplate} from "../tasks/buildTemplate";
import {renderTemplate} from "../tasks/renderTemplate";
import saleTemplate from "../templates/saleTemplate";
import ProductsRequets from "../requests/ProductsRequets";
import SaleFormProductMannager from "../tasks/SaleProductManager";
import {Product} from "../interfaces/Product";
import {ProductsForSale} from "../interfaces/ProductsForSale";
import ProductCalculator from "../tasks/ProductCalculator";
import ShoppingCartManager from "../tasks/ShoppingCartManager";
import SaleProdutTableRows from "../tasks/SaleProdutTableRows";
import MessageBox from "./MessageBox";


class Sales extends HTMLElement {
    // private invoice = [];
    private storeProducts: Product[] = [];
    private productForSale: Partial<ProductsForSale> = {};
    private shoppingCart;

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        const template = buildTemplate('template', saleTemplate);
        this.shadowRoot?.appendChild(template.content.cloneNode(true));
        console.log(template);
        this.shoppingCart = new ShoppingCartManager();
    }

    connectedCallback() {
        if (this.isConnected) {
            this.loadProducts();
            this.addProductToCart();
            this.removeProductFromShoppingCart();
        }
    }

    private loadProducts() {
        ProductsRequets.getAllProducts().then( data => {
            console.log(data);
            this.storeProducts = data.data;
            console.log(this.storeProducts);
            new SaleFormProductMannager(data)

        }).catch( err => {
            console.log(err);
        })
    }

    private addProductToCart () {
        const formProduct = this.shadowRoot?.getElementById('formProduct')! as HTMLFormElement;
        formProduct.addEventListener('submit', ev => {
            ev.preventDefault();
            this.productForSale = {
                ...this.queryProduct(formProduct.productCode.value)[0],
                onSaleQuantity: +formProduct.quantityForSale,
                discount: +formProduct.discount.value,
                priceTotal: ProductCalculator.calculateFinalPrice(
                    this.productForSale,
                    +formProduct.quantityForSale.value,
                    +formProduct.discount.value
                )
            };

           this.shoppingCart.addProductToShoppingCart(this.productForSale);
           this.addProductToSaleTable(this.productForSale);
        });
    }


    private addProductToSaleTable(product: Partial<ProductsForSale>) {
        const table = this.shadowRoot?.getElementById('saleTable') as HTMLElement;
        table.innerHTML += SaleProdutTableRows(product);
    }

    private removeProductFromShoppingCart () {
        const table = this.shadowRoot?.getElementById('saleTable') as HTMLElement;

        table.addEventListener('submit', ev => {
            const target = ev.target as HTMLElement;
            const selectedElement = target.querySelector('form button') as HTMLFormElement;
            const value = +selectedElement.value;
            try{
                const selectRow = this.shadowRoot?.querySelector('tr#product' + value) as HTMLElement;
                selectRow.remove();

                this.shoppingCart.removeProductsFromShoppingCart(value);
                MessageBox.openModal('Producto Removido!');
            }catch (e) {
                console.log(e);
                MessageBox.openModal('Não Eliminado!');
            }
        });
    }

    private queryProduct(code: string): object[]{
        return this.storeProducts.filter(obj => {
            return obj.uniqueID === code;
        })
    }

    render () {
        renderTemplate('sale-page');
    }
}

customElements.define('sale-page', Sales)
