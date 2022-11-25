import {OnSaleProduct} from "../interfaces/OnSaleProduct";

const SaleProdutTableRows = (product: Partial<OnSaleProduct>) => {

    return `
        <tr id="product${product.id}">
            <td>${product.attributes?.code}</td>
            <td>${product.attributes?.name}</td>
            <td>${product.attributes?.price_with_tax}</td>
            <td>${product.on_sale_quantity}</td>
            <td>${product.attributes?.tax_value}</td>
            <td>${product.price_total}</td>
            <td>
                <form>
                    <button class="btn delete" type="submit" value="${product.id}" ><i class="fa fa-trash-alt"></i></button>
                </form>
            </td>
        </tr>
    `;
}

export default SaleProdutTableRows;
