// import logo from '../../images/outonologo.png';

import {SoldProduct} from "../interfaces/SoldProduct";

const SoldProductTable = (products: SoldProduct[]) => {
    let tBody = '';

    const receiptSoldProductResume = document.querySelector('table#receiptSoldProductResume tbody');

    let tableRows = '';
    let i = 1;

    products.map( (props: SoldProduct) => {
        tableRows +=  `
            <tr>
                <td>${props.attributes.sold_product_code}</td>
                <td>${props.attributes.name}</td>
                <td>${props.attributes.sold_price_with_tax}</td>
                <td>${props.attributes.sold_quantity}</td>
                <td>${props.attributes.sold_tax_value}</td>
                <td>${props.attributes.sold_total} Kz</td>
            </tr>
        `;
        i++;
    });

    let table = `
            <table class="table" id="">
                <thead>
                    <tr>
                        <th scope="col">Código</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">Quantidade</th>
                        <th scope="col">Preço unitário</th>
                        <th scope="col">Valor do Imposto</th>
                        <th scope="col">Total ilíquido</th>
                    </tr>
                </thead>
                <tbody>${tBody}</tbody>
            </table>
    `;



}

export default SoldProductTable;
