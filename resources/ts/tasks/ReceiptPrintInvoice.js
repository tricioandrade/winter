import InvoiceBuilder from "../components/InvoiceBuilder";

export const ReceiptPrintInvoice = (invoice, soldProducts) => {
    const receiptSaleResume = document.querySelector("table#receiptSaleResume");

    receiptSaleResume.addEventListener('click', ev => {
        const elem =
            ev.target?.tagName === 'BUTTON' || ev.target?.tagName === 'button' ?
                ev.target?.getAttribute('id') :
            (
                ev.target?.tagName === 'SVG' || ev.target?.tagName === 'svg'
                    ?
                (
                    ev.target?.parentElement).getAttribute('id') :
                    (
                        ev.target?.tagName === 'PATH' || ev.target?.tagName === 'path'
                    ?
                    (
                        (ev.target?.parentElement).parentElement).getAttribute('id') : '' )
            );

        if( parseInt(elem)){
            const Products = soldProducts.data.data.filter( element => {
                return element.attributes.sale_id === parseInt(elem)
            });

            let allProducts = [];
            Products.forEach( (e, k) => {
                allProducts[k] = {
                    ...soldProducts.data.data[k].attributes,
                    ...soldProducts.data.data[k].relationships.product
                }
            });

            new InvoiceBuilder({
                company: invoice.company,
                products: allProducts,
                sale: {id : invoice.sale[elem].id, ...invoice.sale[elem].attributes},
                user:  invoice.sale[elem].relationships.user.name,
                name_doc:  invoice.sale[elem].relationships.invoice_type.description
            });
        }
    });
}
