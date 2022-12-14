export class SaleResolver {

    static calculateProducts(products: any[], newProduct: any[]){
        const index = products.findIndex(object => {
            return object.product_id === newProduct[0].id;
        });

        if (index >= 0) {
            products[index].price_total = +products[index].price_total + +newProduct[0].price_total;
            products[index].discount = +products[index].discount + +newProduct[0].discount;
            products[index].sold_quantity = +products[index].sold_quantity + +newProduct[0].on_sale_quantity;

            return products;
        }


        return products.push(newProduct);
    }
}
