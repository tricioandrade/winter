import '../../css/Calculator.css';
import '../../css/Sales.css';
import {buildTemplate} from "../traits/buildTemplate";
import {renderTemplate} from "../traits/renderTemplate";
import saleTemplate from "../templates/saleTemplate";
import ProductsRequests from "../requests/ProductsRequests";
import SaleFormProductMannager from "../traits/SaleProductManager";
import ProductCalculator from "../traits/ProductCalculator";
import ShoppingCartManager from "../traits/ShoppingCartManager";
import SaleProdutTableRows from "../traits/SaleProdutTableRows";
import MessageBox from "./MessageBox";
import {StockProduct} from "../interfaces/StockProduct";
import {OnSaleProduct} from "../interfaces/OnSaleProduct";


class Sales extends HTMLElement {
    // private invoice = [];
    private stockProducts: StockProduct[] = [];
    private onSaleProduct: Partial<OnSaleProduct> = {};
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
            try {
                this.loadProducts();
                this.addProductToCart();
                this.removeProductFromShoppingCart();
                this.loadCreditNoteComponent();
            }catch (e) {
                console.log(e);
            }
        }
    }

    private loadProducts() {
        ProductsRequests.getAllProducts().then(data => {
            console.log(data);
            this.stockProducts = data.data;
            console.log(this.stockProducts);
            new SaleFormProductMannager(data)

        }).catch( err => {
            console.log(err);
        })
    }

    private addProductToCart () {
        const formProduct = this.shadowRoot?.getElementById('formProduct')! as HTMLFormElement;
        formProduct.addEventListener('submit', ev => {
            ev.preventDefault();
            this.onSaleProduct = {
                ...this.queryProduct(formProduct.productCode.value)[0],
                on_sale_quantity: +formProduct.quantityForSale,
                discount: +formProduct.discount.value,
                price_total: ProductCalculator.calculateFinalPrice(
                    this.onSaleProduct,
                    +formProduct.quantityForSale.value,
                    +formProduct.discount.value
                )
            };

           this.shoppingCart.addProductToShoppingCart(this.onSaleProduct);
           this.addProductToSaleTable(this.onSaleProduct);
        });
    }

    private addProductToSaleTable(onSaleProduct: Partial<OnSaleProduct>) {
        const table = this.shadowRoot?.getElementById('saleTable') as HTMLElement;
        table.innerHTML += SaleProdutTableRows(onSaleProduct);
    }

    private removeProductFromShoppingCart() {
        const table = this.shadowRoot?.getElementById('saleTable') as HTMLElement;

        table.addEventListener('submit', ev => {
            const target: HTMLElement = ev.target as HTMLElement;
            const selectedElement: HTMLFormElement = target.querySelector('form button') as HTMLFormElement;
            const value: number = +selectedElement.value;

            try{
                const selectRow = this.shadowRoot?.querySelector('tr#product' + value) as HTMLElement;
                selectRow.remove();
                this.shoppingCart.removeProductsFromShoppingCart(value);
                MessageBox.openModal('Produto removido!');
            }catch (e) {
                console.log(e);
                MessageBox.openModal('Não foi possivel remover!');
            }
        });
    }

    private queryProduct(code: string): object[]{
        return this.stockProducts.filter(obj => {
            return obj.attributes.code === code;
        })
    }

    loadCreditNoteComponent () {
        const creditNoteBtn = this.shadowRoot?.getElementById('creditNoteBtn') as HTMLElement;
        creditNoteBtn.addEventListener('click', ev => {
            ev.preventDefault();
            this.shadowRoot?.appendChild(this.shadowRoot.ownerDocument.createElement('<credit-note></credit-note>'));
        });
    }

    render () {
        renderTemplate('sale-page');
    }
}

customElements.define('sale-page', Sales)
