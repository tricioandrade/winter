export function ReceiptInvoiceRow(invoices) {
    const receiptSaleResumeTbody = document.querySelector('table#receiptSaleResume tbody');

    let tableRows = '';
    let i = 1;

    invoices.map( props => {
        tableRows +=  `
        <tr>
            <td>${i}</td>
            <td>${props.attributes.invoice_number}</td>
            <td>${props.relationships.invoice_type.description}</td>
            <td>${props.relationships.user.name}</td>
            <td>${props.attributes.date}</td>
            <td>${props.attributes.total} Kz</td>
            <td><button id="${props.id}"><i class="fa fa-print"></i></button></td>
        </tr>
    `;
        i++;
    });
    receiptSaleResumeTbody.innerHTML = tableRows;
}
