import {Calculator} from "../interfaces/Calculator";
import {SoldProduct} from "../interfaces/SoldProduct";
import {ProductType} from "../interfaces/ProductType";

class CalculatorTask {
    static calculateFinalPrice(priceWithTax: number, onSaleQuantity: number, discount: number = 0): number{
        let result = 0;
        result =  (+priceWithTax * +onSaleQuantity ) - discount;
        return +result.toFixed(4);
    }

    static getNumber(value: string): number {
        return +value;
    }

    static calculateProducts(products: SoldProduct[], newProduct: any): SoldProduct[]{
        const index = products.findIndex(object => {
            return object.product_id === newProduct.product_id;
        });

        if (index >= 0) {
            products[index].total = +(products[index].total + parseFloat(newProduct.price_with_tax) - parseInt(newProduct.discount)).toFixed(4);
            products[index].discount = products[index].discount + parseInt(newProduct.discount);
            products[index].sold_quantity = products[index].sold_quantity + newProduct.sold_quantity;

            return products;
        }

        products.push(newProduct);
        return products;
    }

    static calculateSumOfTotal(soldProducts: any[]){
        return soldProducts.reduce((previousValue: any, currentValue: any) => {
            return {
                total: +parseFloat(previousValue.total + currentValue.total).toFixed(4),
                tax_total: +parseFloat(previousValue.tax_total + currentValue.tax_total).toFixed(4),
                service_total: ( previousValue.product_type_id === ProductType.S
                    ?  +parseFloat(previousValue.total + currentValue.total).toFixed(4) : 0.00),
                merchandise_total: ( previousValue.product_type_id === ProductType.P
                    ?  +parseFloat(previousValue.total + currentValue.total).toFixed(4) : 0.00),
                commercial_discount: +previousValue.discount + +currentValue.discount
            }
        });
    }

    static calculatePriceTax<T extends Calculator>(props: T):{ priceWithTax: number, taxAdded:number , discount: number}  {

        return {
            priceWithTax: this.getNumber((((props.price * props.taxValue) / 100) + props.price).toFixed(4)),
            taxAdded: this.getNumber(((props.price * props.taxValue) / 100).toFixed(2)),
            discount: 0
        }
    }

}

export default CalculatorTask;
