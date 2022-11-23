import axios from "../api/axios";
import MessageBox from "../tasks/MessageBox";

const SaleSendInvoice = async (invoice) => {

    if (invoice.invoiceType === 'FR' || invoice.invoiceType === 'VD' || invoice.invoiceType === 'NC') {

        const zero = parseFloat(0).toFixed(2);

      try {
          const form = new FormData();

          form.append('invoice_changed_ref', invoice.invoice_changed_ref);
          form.append('type_of_change', invoice.type_of_change);
          form.append('paid_value', invoice.paidValue);
          form.append('payment_condition',  invoice.paymentCondition);
          form.append('payment_method',  invoice.paymentMethod);
          form.append('invoice_type_ref',  invoice.invoiceType);
          form.append('change',  invoice.change);
          form.append('merchandise_total',  invoice.total);
          form.append('commercial_discount',  zero);
          form.append('financial_discount',  zero);
          form.append('postage',  zero);
          form.append('service_total',    invoice.totalServices);
          form.append('iva_total',  invoice.totalIva);
          form.append('advance',  zero);
          form.append('ecovalue',  zero);
          form.append('hit',  zero);
          form.append('total',  invoice.total);

          form.append('products',  JSON.stringify(invoice.products));



          return await axios.post('/sold', form);

      }catch (err){
          MessageBox(err);
      }
    }
    else {
        MessageBox("Formato de factura não atribuída à aplicação!");
    }

}
export default SaleSendInvoice;
