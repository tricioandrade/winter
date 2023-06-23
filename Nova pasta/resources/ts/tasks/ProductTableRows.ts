// export function ProductTableRows(products) {
//     const receiptSoldProductResume = document.querySelector('table#receiptSoldProductResume tbody');
//
//     let tableRows = '';
//     let i = 1;
//
//     products.map( props => {
//         tableRows +=  `
//             <tr>
//                 <td>${i}</td>
//                 <td>${props.relationships.product.name}</td>
//                 <td>${props.relationships.product.description}</td>
//                 <td>${props.attributes.discount}</td>
//                 <td>${props.attributes.quantity}</td>
//                 <td>${props.relationships.sale.invoice_number}</td>
//                 <td>${props.attributes.total} Kz</td>
//             </tr>
//         `;
//         i++;
//     });
//     receiptSoldProductResume.innerHTML = tableRows;
// }
