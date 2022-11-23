import './Calculator.css';
import './Sales.css';
import axios from "../api/axios";
import MessageBox from "../tasks/MessageBox";
import SaleProductCalculator from "../tasks/SaleProductCalculator";
import Saletable from "./SaleTable";
import SaleSendInvoice from "./SaleSendInvoice";
import SaleFormProducts from "../templates/SaleFormProducts";
import SaleFormAccount from "../templates/SaleFormAccount";
import SaleFormPayment from "../templates/SaleFormPayment";
import InvoiceBuilder from "./InvoiceBuilder";
import logo from "./media/outonologo.png";
import CleanSaleAndPrint from "./CleanSaleAndPrint";
import {CreditNoteInput} from "../tasks/CreditNoteInput";
import SaleFormCreditNote from "../templates/SaleFormCreditNote";
import InvoiceList from "./InvoiceList";


class Sales {

    constructor (){
        this.invoice = [];
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
        <div id="sales-css" class="container animation">
            <div class="row">
                <h4><i class="fa fa-cash-register"></i>&nbsp;Vendas</h4>
                <hr>
            </div>
            <div class="row">
                <div class="col-3">
                    ${ SaleFormCreditNote() }
                    ${ SaleFormPayment() }
                    ${ SaleFormProducts() }
                </div>
                <div class="col-9 row">
                    <div class="col-12 card p-2 shadow rounded m-1  p-2" style="height: 70vh">
                        <div class="table-div"  style="height: 68vh; overflow: auto">
                            ${ Saletable() }
                        </div>
                            ${ SaleFormAccount() }
                    </div>

                    <div id="btn-section" class="col-4">
                        <div class="btn-group" role="group" aria-label="Basic example">
                              <button id="printAgain" type="button" class="btn btn-primary">Imprimir novamente</button>
                        </div>
                    </div>
                    <div id="btn-section" class="col-8 row text-end p-0">
                        <button id="FR" type="button" class="btn col float-end btn-primary">Imprimir Factura Recibo</button>
                        <button id="VD" type="button" class="btn col float-end btn-primary">Imprimir Venda à Dinheiro</button>
                        <button id="NC" type="button" class="btn col float-end btn-primary">Imprimir Nota de Crédito</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    }
}

export default Sales;
