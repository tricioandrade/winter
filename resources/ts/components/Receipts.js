import axios from "../api/axios";
import ReceiptSaftCard from "../templates/ReceiptSaftCard";
import ReceiptSqlBackUpCard from "../templates/ReceiptSqlBackUpCard";
import ReceiptSaleResumeTable from "../templates/ReceiptSaleResumeTable";
import MessageBox from "./MessageBox";
import Preloader from "./Preloader";
import ReceiptSoldProductResume from "../templates/ReceiptSoldProductResume";
import {ReceiptInvoiceRow} from "../tasks/ReceiptInvoiceRow";
import {ReceiptProductRows} from "../tasks/ReceiptProductRows";
import {InvoicesMonthsList} from "../tasks/InvoicesMonthsList";
import {ReceiptPrintInvoice} from "../tasks/ReceiptPrintInvoice";

class Receipts {

    constructor() {
        this.invoices = 1;
    }

    main = () => {
        this.saleAndProductResume();
        this.safTExport();
        this.databaseBackup();
    }

    saleAndProductResume  = async () => {
        Preloader().active();
        try {
            const response = await axios.get('invoices/total');
            const invoices = await axios.get('invoices/');
            const soldProducts = await axios.get('sold_products/');

            this.invoices = invoices.data[0];


            console.log(invoices);
            InvoicesMonthsList(invoices.data.sale);
            ReceiptInvoiceRow( invoices.data.sale);
            ReceiptProductRows( soldProducts.data.data);
            ReceiptPrintInvoice(invoices.data, soldProducts);

        }catch (e) {
            console.log(e);
            MessageBox('Ocorreu um erro ao carregar o relatório de facturas.')
        }
        Preloader().remove();
    }

    safTExport = () => {
        const safTDate = document.getElementById('saftExportFormDate');
        const safTYear = document.getElementById('saftExportFormYear');
        const safTMonth = document.getElementById('saftExportFormMonth');

        const func = (elem, prop) => {
            elem.addEventListener('submit',async ev => {
                Preloader().active();

                ev.preventDefault();
                'safTDate'  === prop ? await open('http://localhost:4000/date/' + elem.safTDate.value) : null;
                'safTYear'  === prop ? await open('http://localhost:4000/year/' + elem.safTYear.value) : null;
                'safTMonth' === prop ? await open('http://localhost:4000/month/' + elem.safTMonth.value) : null;
                Preloader().remove();

            });
        }

        func(safTDate, 'safTDate');
        func(safTYear, 'safTYear');
        func(safTMonth, 'safTMonth');
    }

    databaseBackup = () => {
        const backupSql = document.getElementById('backupSql');
        backupSql.addEventListener('click', async ev => {
            Preloader().active();
            try {
                await open(appBaseUrl + 'backup/');
                Preloader().remove();

            }catch (e) {
                console.log(e);
                Preloader().active();
            }
        });
    }




    render = () => {

        return  `
        <div class="container">
          <div class="row">
                <h4><i class="fa fa-cash-register"></i>&nbsp;Vendas</h4>
                <hr>
            </div>

            <div class="row d-flex align-items-stretch" style="height: 80vh; overflow: auto;">
                <div class="col-8 m-1 card p-2 shadow rounded ">
                    ${ ReceiptSaleResumeTable() }
                </div>
                <div class="col-3 m-1 card p-2 shadow rounded ">
                    ${ ReceiptSaftCard() }
                </div>
                <div class="col-8 m-1 card p-2 shadow rounded ">
                    ${ ReceiptSoldProductResume() }
                </div>
                <div class="col-3 m-1 card p-2 shadow rounded ">
                    ${ ReceiptSqlBackUpCard() }
                </div>
            </div>
        </div>
        `

    }
}

export default Receipts;
