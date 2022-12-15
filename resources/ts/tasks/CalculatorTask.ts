import {Calculator} from "../interfaces/Calculator";
import {SoldProduct} from "../interfaces/SoldProduct";
import {Product} from "../interfaces/Product";
import {ProductResource} from "../interfaces/ProductResource";


class CalculatorTask {
    static calculateFinalPrice(priceWithTax: number, onSaleQuantity: number, discount: number = 0): number{
        let result = 0;
        result =  (+priceWithTax * +onSaleQuantity ) - discount;
        return +result.toFixed(4);
    }


    static calculateProducts(products: any[], newProduct: any): Partial<SoldProduct[]> |
        Partial<Product[]> |
        Partial<ProductResource[]> {
        const index = products.findIndex(object => {
            return object.product_id === newProduct.product_id;
        });

        if (index >= 0) {
            products[index].price_total = (parseFloat(products[index].price_total) + parseFloat(newProduct.price_with_tax) - parseInt(newProduct.discount)).toFixed(4);
            products[index].discount = parseInt(products[index].discount) + parseInt(newProduct.discount);
            products[index].sold_quantity = products[index].sold_quantity + newProduct.sold_quantity;

            console.log('Ex: ', products);
            console.log('Ex: ', newProduct.on_sale_quantity );
            console.log('Ex: ', products[index]);
            return products;
        }

        products.push(newProduct);
        console.log('IO: ', products);
        return products;
    }

    static calculateSumOfTotal(soldProducts: any[]){
        return soldProducts.reduce((previousValue: any, currentValue: any) => {
            return {
                total: previousValue.total + currentValue.total,
                tax_total: previousValue.tax_total + currentValue.tax_total
            }
        });
    }

    static calculatePriceTax<T extends Calculator>(props: T):{ priceWithTax: number, taxAdded:number , discount: number}  {

        return {
            priceWithTax: +(((props.price * props.taxValue) / 100) + props.price).toFixed(4),
            taxAdded: +((props.price * props.taxValue) / 100).toFixed(2),
            discount: 0
        }
    }

    static removeProduct() {

    }
}

export default CalculatorTask;
