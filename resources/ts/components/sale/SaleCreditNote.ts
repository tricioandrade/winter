// import '../../css/CalculatorTask.css';
// import '../../css/Sales.css';
// import {buildTemplate} from "../traits/buildTemplate";
// import saleTemplate from "../templates/saleTemplate";
// import {ProductsForSale} from "../interfaces/ProductsForSale";
// import ProductCalculator from "../traits/ProductCalculator";
// import ShoppingCartManager from "../traits/ShoppingCartManager";
// import SaleProdutTableRows from "../traits/SaleProdutTableRows";
// import MessageBox from "./MessageBox";
// import InvoicesRequests from "../requests/InvoicesRequests";
// import {InvoiceResource} from "../interfaces/InvoiceResource";
//
// class CreditNote extends HTMLElement {
//     // private invoice = [];
//     private invoices: InvoiceResource[] = [];
//     private shoppingCart;
//
//     constructor() {
//         super();
//         this.attachShadow({mode: 'open'});
//         const template = buildTemplate('template', creditNoteTemplate);
//         this.shadowRoot?.appendChild(template.content.cloneNode(true));
//         console.log(template);
//         this.shoppingCart = new ShoppingCartManager();
//     }
//
//     connectedCallback() {
//         if (this.isConnected) {
//             try {
//                 this.loadInvoices();
//                 this.addProductToCart();
//                 this.removeProductFromShoppingCart();
//                 this.closeCreditNoteComponent();
//             }catch (e) {
//                 console.log(e)
//             }
//         }
//     }
//
//     private loadInvoices() {
//         InvoicesRequests.getAllPaidInvoices().then(data => {
//             console.log(data);
//             this.invoices = data.data;
//             console.log(this.invoices);
//
//         }).catch( err => {
//             console.log(err);
//         })
//     }
//
//     private addProductToCart () {
//         const formProduct = this.shadowRoot?.getElementById('formProduct')! as HTMLFormElement;
//         formProduct.addEventListener('submit', ev => {
//             ev.preventDefault();
//             this.productForSale = {
//                 ...this.queryInvoice(formProduct.productCode.value)[0],
//                 onSaleQuantity: +formProduct.quantityForSale,
//                 discount: +formProduct.discount.value,
//                 priceTotal: ProductCalculator.calculateFinalPrice(
//                     this.productForSale,
//                     +formProduct.quantityForSale.value,
//                     +formProduct.discount.value
//                 )
//             };
//
//             this.shoppingCart.addProductToShoppingCart(this.productForSale);
//             this.addProductToSaleTable(this.productForSale);
//         });
//     }
//
//     private addProductToSaleTable(product: Partial<ProductsForSale>) {
//         const table = this.shadowRoot?.getElementById('saleTable') as HTMLElement;
//         table.innerHTML += SaleProdutTableRows(product);
//     }
//
//     private removeProductFromShoppingCart () {
//         const table = this.shadowRoot?.getElementById('saleTable') as HTMLElement;
//
//         table.addEventListener('submit', ev => {
//             const target: HTMLElement = ev.target as HTMLElement;
//             const selectedElement: HTMLFormElement = target.querySelector('form button') as HTMLFormElement;
//             const value: number = +selectedElement.value;
//             try{
//                 const selectRow = this.shadowRoot?.querySelector('tr#product' + value) as HTMLElement;
//                 selectRow.remove();
//
//                 this.shoppingCart.removeProductsFromShoppingCart(value);
//                 MessageBox.openModal('Produto Removido!');
//             }catch (e) {
//                 console.log(e);
//                 MessageBox.openModal('Não Eliminado!');
//             }
//         });
//     }
//
//     private queryInvoice(uniqueNumber: string): object[]{
//         return this.invoices.filter(obj => {
//             return obj.attributes.invoice_number === uniqueNumber;
//         })
//     }
//
//     closeCreditNoteComponent () {
//         const closeCreditNoteBtn = this.shadowRoot?.getElementById('closeCreditNoteBtn') as HTMLElement;
//         closeCreditNoteBtn.addEventListener('click', ev => {
//             ev.preventDefault();
//             this.remove();
//         });
//     }
// }
//
// customElements.define('credit-note', CreditNote)
