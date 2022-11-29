import '../../css/Calculator.css';
import '../../css/Sales.css';
import {buildTemplate} from "../traits/buildTemplate";
import {renderTemplate} from "../traits/renderTemplate";
import saleTemplate from "../templates/saleTemplate";
import ProductsRequests from "../requests/ProductsRequests";
// import SaleFormProductMannager from "../traits/SaleProductManager";
import ProductCalculator from "../traits/ProductCalculator";
import ShoppingCartManager from "../traits/ShoppingCartManager";
import SaleProdutTableRows from "../traits/SaleProdutTableRows";
import MessageBox from "./MessageBox";
import {StockProduct} from "../interfaces/StockProduct";
import {OnSaleProduct} from "../interfaces/OnSaleProduct";
import React from "react";


class Sales extends React.Component {
    // private invoice = [];
    private stockProducts: StockProduct[] = [];
    private onSaleProduct: Partial<OnSaleProduct> = {};
    private shoppingCart = new ShoppingCartManager();

    constructor(props: object) {
        super(props);
    }

    componentDidMount() {
        try {
            this.loadProducts();
            this.addProductToCart();
            this.removeProductFromShoppingCart();
            this.loadCreditNoteComponent();
        }catch (e) {
            console.log(e);
        }
    }

    private loadProducts() {
        ProductsRequests.getAllProducts().then(data => {
            console.log(data);
            this.stockProducts = data.data;
            console.log(this.stockProducts);
            // new SaleFormProductMannager(data)

        }).catch( err => {
            console.log(err);
        })
    }

    private addProductToCart () {
        const formProduct = document.getElementById('formProduct')! as HTMLFormElement;
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
        const table = document.getElementById('saleTable') as HTMLElement;
        table.innerHTML += SaleProdutTableRows(onSaleProduct);
    }

    private removeProductFromShoppingCart() {
        const table = document.getElementById('saleTable') as HTMLElement;

        table.addEventListener('submit', ev => {
            const target: HTMLElement = ev.target as HTMLElement;
            const selectedElement: HTMLFormElement = target.querySelector('form button') as HTMLFormElement;
            const value: number = +selectedElement.value;

            try{
                const selectRow = document.querySelector('tr#product' + value) as HTMLElement;
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
        const creditNoteBtn = document.getElementById('creditNoteBtn') as HTMLElement;
        creditNoteBtn.addEventListener('click', ev => {
            ev.preventDefault();
            document.appendChild(document.createElement('<credit-note></credit-note>'));
        });
    }

    render () {
        return <saleTemplate />;
    }
}

export default Sales;
