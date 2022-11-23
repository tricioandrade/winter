import './Calculator.css';
import './Sales.css';
import axios from "../api/axios";
import MessageBox from "./MessageBox";
import SaleProductCalculator from "../tasks/SaleProductCalculator";
import SaleSendInvoice from "./SaleSendInvoice";
import InvoiceBuilder from "./InvoiceBuilder";
import InvoiceList from "./InvoiceList";
import {buildTemplate} from "../tasks/buildTemplate";
import inventoryTemplate from "../templates/inventoryTemplate";


class Sales extends HTMLElement{
    private invoice: [] = [];

    private template: HTMLTemplateElement;

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.template = buildTemplate('div', inventoryTemplate);
        this.shadowRoot?.appendChild(this.template.content.cloneNode(true));
        console.log(this.template);
    }


    printAgain = () => {

      document.getElementById('printAgain').addEventListener('click', ev => {
          new  InvoiceBuilder(this.invoice);

      });
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

    listener = (elem, callback) => {
        elem.addEventListener('submit', callback(ev));
    }

    saleFormProduct =  () => {

        InvoiceList().then( temp => document.getElementById('changed_ref').innerHTML = temp.template);


        const form =  document.getElementById('sale-form-product');
        const calculator = new SaleProductCalculator();
        form.addEventListener('submit', async e => {
            e.preventDefault();
            const productInput = form.productInput.value;
            const quantity = form.quantity.value;
            const discount = 0;

            try {
                let One = 1;
                if (calculator.actualProduct){
                    One = calculator.actualProduct.quantity
                }

                console.log(`calculator/${productInput +'/'+ quantity +'/'+ discount}`);
                const  response = await axios.get(`calculator/${productInput +'/'+ quantity+ '/'+ One +'/'+ discount}` );
                let product  = response.data.data.data.product;

                calculator.addProduct(product);
            }
            catch (e){
                console.log(e);
                MessageBox('Não foi possivel adicionar o produto, por favor verifique o stock do produto!');
            }
        });

        calculator.remProduct();

        this.finishSale(calculator);
        this.printAgain();
     }

    render () {

        return `
    `;
    }
}

export default Sales;
