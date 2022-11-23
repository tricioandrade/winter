const SaleProdutTableRows = (product) => {
    document.querySelector("#saleTable tbody").innerHTML +=`
        <tr id="${product.ref_code ?? product.generated_code}">
            <td>${product.name}</td>
            <td>${product.price_tax}</td>
            <td>${product.quantity}</td>
            <td>${product.tax_value}</td>
            <td>${product.total}</td>
            <td><a href="#" class="text-center text-danger" id="removeProduct${product.product_id}"><i class="fa fa-trash-alt"></i></a></td>
        </tr>
    `;
}

export default SaleProdutTableRows;
