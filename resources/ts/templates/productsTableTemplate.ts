// import logo from '../../images/outonologo.png';

const productsTableTemplate = (products) => {
    let tBody = '';



    const receiptSoldProductResume = document.querySelector('table#receiptSoldProductResume tbody');

    let tableRows = '';
    let i = 1;

    products.map( props => {
        tableRows +=  `
            <tr>
                <td>${i}</td>
                <td>${props.relationships.product.name}</td>
                <td>${props.relationships.product.description}</td>
                <td>${props.attributes.discount}</td>
                <td>${props.attributes.quantity}</td>
                <td>${props.relationships.sale.invoice_number}</td>
                <td>${props.attributes.total} Kz</td>
            </tr>
        `;
        i++;
    });

    let table = `
            <table class="table product  table-venda productList  scroll-table" id="table-venda">
                <thead>
                    <tr>
                        <th scope="col" id="code" >Código</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">Quantidade</th>
                        <th scope="col">Preço unitário</th>
                        <th scope="col">Tx IVA</th>
                        <th scope="col">Total líquido</th>
                    </tr>
                </thead>
                <tbody>${tBody}</tbody>
            </table>
    `;



}

export default productsTableTemplate;
