import {Calculator} from "../interfaces/Calculator";
import {SoldProduct} from "../interfaces/SoldProduct";
import {Product} from "../interfaces/Product";
import {ProductResource} from "../interfaces/ProductResource";


class CalculatorTask {
    static calculateFinalPrice(priceWithTax: number, onSaleQuantity: number, discount: number = 0): number{
        let result = 0;
        result =  (priceWithTax * onSaleQuantity ) - discount;
        let floatResult = result.toFixed(4);

        return Number.parseFloat(floatResult);
    }


    static calculateProducts(products: any[], newProduct: any): Partial<SoldProduct[]> |
        Partial<Product[]> |
        Partial<ProductResource[]> {
        const index = products.findIndex(object => {
            return object.product_id === newProduct.product_id;
        });

        if (index >= 0) {
            products[index].price_total =( +products[index].price_total + +newProduct.price_total) - +newProduct.discount;
            products[index].discount = +products[index].discount + +newProduct.discount;
            products[index].sold_quantity = +products[index].sold_quantity + +newProduct.on_sale_quantity;

            return products;
        }

        products.push(newProduct);
        return products;
    }

    static calculateSumOfTotal(soldProducts: object[]){
        return soldProducts.reduce( (previousValue: any, currentValue: any) => {
            return {
                total: previousValue.total + currentValue.total,
                total_tax_sold: previousValue.tax_total + currentValue.tax_total
            }
        } )
    }

    static calculatePriceTax<T extends Calculator>(props: T):{ priceWithTax: number, taxAdded:number , discount: number}  {

        return {
            priceWithTax: +(((props.price * props.taxValue) / 100) + props.price).toFixed(4),
            taxAdded: +((props.price * props.taxValue) / 100).toFixed(2),
            discount: 0
        }
    }
}

export default CalculatorTask;
