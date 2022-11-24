import '../../css/Calculator.css';
import '../../css/Sales.css';
import axios from "../api/axios";
import MessageBox from "./MessageBox";
import SaleProductCalculator from "../tasks/SaleProductCalculator";
import SaleSendInvoice from "./SaleSendInvoice";
import InvoiceBuilder from "./InvoiceBuilder";
import InvoiceList from "./InvoiceList";
import {buildTemplate} from "../tasks/buildTemplate";
import inventoryTemplate from "../templates/inventoryTemplate";
import {renderTemplate} from "../tasks/renderTemplate";
import saleTemplate from "../templates/saleTemplate";
import {Product} from "../interfaces/Product";


class Sales extends HTMLElement{
    private invoice = [];
    private productsForSale: Product[];
    constructor(productsForSale: Product[]) {
        super();
        this.productsForSale = productsForSale;

        this.attachShadow({mode: 'open'});
        const template = buildTemplate('template', saleTemplate);
        this.shadowRoot?.appendChild(template.content.cloneNode(true));
        console.log(template);
    }

    connectedCallback() {

    }



    finishSale = async (calculator) => {

        const sale =  (button, invoiceType) => {
            button.addEventListener('click', ev => {
                if (calculator.hasProduct()){

                    if (invoiceType === 'NC'){
                        if (!document.getElementById('invoice_changed_ref').value){
                            MessageBox('Insira o número da respectiva factura a ser alterada!');
                            return;
                        }
                    }

                    if (invoiceType === 'VD'){
                        if (isNaN(parseFloat(calculator.paidValue()))){
                            MessageBox('Insira um valor de pagamento para venda a dinheiro!');
                            return;
                        }
                    }

                    if (calculator.closeSale(invoiceType).stop) {
                        return;
                    }

                    SaleSendInvoice({...calculator.render(), ...calculator.closeSale(), invoiceType: invoiceType})
                        .then(data => {
                            console.log(data);
                            let invoice = JSON.parse(data.data);

                            new InvoiceBuilder(invoice);

                            this.invoice = invoice;
                            new SaleProductCalculator();
                        }).catch(err => {
                            console.log(err);
                            MessageBox('Ocorreu um erro não foi possível realizar venda, por fafor contacte o adminstrador!')
                    });
                }
            });
        }

        sale(document.getElementById('FR'), 'FR');
        sale(document.getElementById('VD'), 'VD');
        sale(document.getElementById('NC'), 'NC');

    }


    render () {
        renderTemplate('sale-page');
    }
}

customElements.define('sale-page', Sales)
