import axios from "../api/axios";
import MessageBox from "../tasks/MessageBox";
import Preloader from "./Preloader";


async function InvoiceList  (){
    let template = ``;
    Preloader().active();
    let invoices;
    try {
        const response = await axios.get('invoices');
        invoices = response.data;
        console.log(invoices);
        invoices.sale.forEach((item) => {
            template += `
            <option accesskey="${item.id}" value="${ item.attributes.invoice_number}">${item.attributes.invoice_number}</option>
            `;
        });

    }catch (err){   MessageBox('Erro na busca de facturas') }


    return {
        template: template,
        invoices: invoices
    };
}

export default  InvoiceList;
