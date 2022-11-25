import {ProductsForSale} from "../interfaces/ProductsForSale";

const SaleProdutTableRows = (product: Partial<ProductsForSale>) => {

    return `
        <tr id="product${product.id}">
            <td>${product.uniqueID}</td>
            <td>${product.name}</td>
            <td>${product.priceWithTax}</td>
            <td>${product.onSaleQuantity}</td>
            <td>${product.taxValue}</td>
            <td>${product.priceTotal}</td>
            <td>
                <form>
                    <button class="btn delete" type="submit" value="${product.id}" ><i class="fa fa-trash-alt"></i></button>
                </form>
            </td>
        </tr>
    `;
}

export default SaleProdutTableRows;
