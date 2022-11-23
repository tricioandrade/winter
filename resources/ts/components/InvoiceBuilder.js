import DateAndTime from "../tasks/DateAndTime";
import PrintTemplate from "./PrintTemplate";
import Preloader from "./Preloader";
import CleanSaleAndPrint from "./CleanSaleAndPrint";

class InvoiceBuilder {
    constructor(invoice) {

        const company = invoice.company;
        const products = invoice.products;
        const sale = invoice.sale;
        const name = invoice.user;
        const doc = invoice.name_doc;

        let user = { name: name }

        Preloader().active();

        PrintTemplate();

        this.invoiceHeader(company[0]);
        this.invoiceDetails(sale, doc);
        this.invoiceMiddleInfo(sale);
        this.rows(products);
        this.resumeFooter(sale, user, company[0]);
        this.footer(sale, user);

        window.print();
        CleanSaleAndPrint();
        Preloader().remove();

    }

    invoiceHeader = (company) => {
        document.getElementById("invoiceHeader").innerHTML =
            `<div class="row text-start">
            <div class="row col-12 p-0 mt-2">
                <div class="col-8 col-sm-12 col-md-12">
                    <ul>
                        <li>${company.name}</li>
                        <li>${company.address}</li>
                        <li>${company.city + '-' + company.country}</li>
                        <li>Telm: ${company.phone ?? ''}</li>
                        <li>E-mail: ${company.email ?? ''}</li>
                        <li>Contribuinte: ${company.nif}</li>
                    </ul>
                </div>
                <div class="col-4 col-sm-12 col-md-12">
                    <ul>
                        <li>Consumidor Final</li>
                        <li></li>
                        <li>Rua</li>
                        <li>Tel. </li>
                        <li>Email:</li>
                        <li><h6></h6></li>
                    </ul>
                </div>
            </div>
        </div>`;
    }

    invoiceDetails = (details, doc) => {
        document.getElementById("invoiceDetails").innerHTML =
            `<div class="col-12 text-start invoiceID" style="font-weight: bold">
                 ${doc} ${details.invoice_number}
                       </div>
                     <table class="table table-venda" id="tableHeader">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Processo</th>
                                <th>Moeda</th>
                                <th>Câmbio</th>
                                <th>Contribuinte</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>${details.id}</td>
                                <td>${details.id}</td>
                                <td>AOA</td>
                                <td>750</td>
                                <td>${details.customer}</td>
                            </tr>
                        </tbody>
                    </table>`
    }

    invoiceMiddleInfo = (data) => {
        document.getElementById("invoiceMiddleInfo").innerHTML =
            `<table class="table saleTable" id="tableMiddle">
                            <thead>
                                <tr>
                                    <th>Requisição</th>
                                    <th>Data</th>
                                    <th>Vencimento</th>
                                    <th>Condições de pagamento</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr id="venda${data.id}">
                                    <td>${DateAndTime.monthList[DateAndTime.date().getMonth()] ?? ''}</td>
                                    <td>${data.date}</td>
                                    <td>${data.expiration_date}</td>
                                    <td>${data.payment_method}</td>
                                </tr>
                            </tbody>
                        </table>`
    }

    rows = (article) => {
        let products = ``;

        const arr = article.filter( element => {
            return element !== null
        });

        console.log(arr);

        arr.forEach( (e, k) => {
            console.log(e);
            console.log(e[k]);

            if (e.product_id){
               products += `
                <tr id="${e.product_id}">
                        <td id="id" >${e.product_id}</td>
                        <td>${e.name}</td>
                        <td>${e.quantity}</td>
                        <td>${e.price_tax}</td>
                        <td>${e.tax ?? e.tax_value}</td>
                        <td>${e.total}</td>
                    </tr>`;
           }
        });

        document.querySelector('table.product tbody').innerHTML = products;
    }

    resumeFooter = (data, user, company) => {


        document.getElementById("footerInfo").innerHTML += `<div class="row">
                <div class="row col-6">
                    <div class="col-12">
                        <table class="table">
                        <thead>
                            <tr>
                                <th>Taxa</th>
                                <th>Incidência</th>
                                <th>Motivo Isenção</th>
                                <th>Multa</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tbody>
                                <tr>
                                    <td>${data.impostoAcrescentado ?? ''}</td>
                                    <td>${data.incidencia ?? ''}</td>
                                    <td> </td>
                                    <td>${data.multa ?? '0.00'}</td>
                                </tr>
                            </tbody>
                        </tbody>
                    </table>
                    </div>
                    <div class="row col-12">
                           <ul class="text-center">
                                <li class="col-12">COORDENADAS BANCÁRIAS</li>
                                <li class="col-12">${data.iban ?? ''}</li>
                            </ul>
                    </div>
                </div>
                 <div class="col-6">
                    <ul style="border-top:3px solid #000 !important;">
                        <li class="row">
                            <span class="col-6 text-start">Mercadoria/Serviços</span>
                            <span class="col-6 text-end">${data.merchandise_total}</span></li>
                        <li class="row">
                            <span class="col-6 text-start">Descontos Comerciais</span>
                            <span class="col-6 text-end">${data.commercial_discount ?? "0,00"}</span></li>
                        <li class="row">
                            <span class="col-6 text-start">Descontos Financeiros</span>
                            <span class="col-6 text-end">${data.financial_discount ?? "0,00"}</span></li>
                        <li class="row">
                            <span class="col-6 text-start">Portes</span>
                            <span class="col-6 text-end">${data.postage ?? "0,00"}</span></li>
                        <li class="row">
                            <span class="col-6 text-start">Serviços</span>
                            <span class="col-6 text-end">${data.service_total ?? "0,00"}</span></li>
                        <li class="row">
                            <span class="col-6 text-start">IVA</span>
                            <span class="col-6 text-end">${data.iva_total ?? "0,00"}</span></li>
                        <li class="row">
                            <span class="col-6 text-start">Adiantamento</span>
                            <span class="col-6 text-end">${data.advance ?? "0,00"}</span></li>
                        <li class="row">
                            <span class="col-6 text-start">Ecovalor</span>
                            <span class="col-6 text-end">${data.ecovalue ?? "0,00"}</span></li>
                        <li class="row">
                            <span class="col-6 text-start">Acerto</span>
                            <span class="col-6 text-end">${data.hit ?? "0,00"}</span>
                        </li>
                        <li class="row">
                            <span class="col-6 text-start"><h6>Total</h6></span>
                            <span class="col-6 text-end">${data.total ?? "0,00"} AOA</span>
                        </li>
                        </ul>
                    </div>
                    <div class="col-12">
                        <p class="text-center" style="border-bottom:2px solid #000;border-top:2px solid #000;">Atendido por: ${'Patricio Andrade'} | Data: ${data.date}</p>
                        <p class="text-center">${data.mini_hash} &horbar; Documento processado por sofuware valido ${company.licence} </p>
                    </div>
             </div>
            `
    }

    footer = (sale, user) => {
        let date = DateAndTime.date();
        let month = DateAndTime.monthList;


        document.getElementById("print").innerHTML += `
                <ul>
                    <li><h6>Total líquido: ${sale.total}</h6> </li>
                    <li><h6><i>Processado por: ${user.name}</i></h6></li>
                    <li>Luanda, ${date.getDay() +' de '+month[date.getMonth()]+' '+date.getFullYear()+ ' &horbar; ' + date.getHours()+' '+date.getMinutes()}</li>
                </ul>

            `;
    }

}
export default  InvoiceBuilder;
