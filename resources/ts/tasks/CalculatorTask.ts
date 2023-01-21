import {Calculator} from "../interfaces/Calculator";
import {SoldProduct} from "../interfaces/SoldProduct";
import {ProductType} from "../interfaces/ProductType";
import {SaleTotal} from "../interfaces/SaleTotal";

class CalculatorTask {
    static calculateFinalPrice(priceWithTax: number, onSaleQuantity: number, discount: number = 0): number{
        return +parseFloat((priceWithTax * onSaleQuantity - discount).toString()).toFixed(4);
    }

    static getNumber(value: string): number {
        return +value;
    }

    static calculateProducts(products: SoldProduct[], newProduct: SoldProduct): SoldProduct[]{
        const index = products.findIndex(object => {
            return object.product_id === newProduct.product_id;
        });

        if (index >= 0) {
            products[index].total = this.parseFloatSum(products[index].total, newProduct.price_with_tax) - newProduct.discount;
            products[index].discount = newProduct.discount > 0 ? products[index].discount + newProduct.discount : 0;
            console.log(products[index].discount);
            products[index].sold_quantity = products[index].sold_quantity + newProduct.sold_quantity;

            console.log(products);
            return products;
        }

        products.push(newProduct);
        console.log(newProduct);
        return products;
    }

    private static parseFloatSum(num1: number, num2:number ):number {
        return +parseFloat((num1 + num2).toString()).toFixed(4);
    }

    static calculateSumOfTotal(soldProducts: SoldProduct[]): SaleTotal{
        let total: SaleTotal = {
            commercial_discount: 0.00,
            merchandise_total: 0.00,
            service_total: 0.00,
            tax_total: 0.00,
            total:0.00
        };

        soldProducts.forEach((obj: SoldProduct) => {
            total = {
                total: this.parseFloatSum(obj.total, total.total),
                tax_total: this.parseFloatSum(obj.tax_total, total.tax_total),
                service_total: (obj.product_type_id === ProductType.S ?
                    this.parseFloatSum(obj.total, total.service_total) : total.service_total),
                merchandise_total: (obj.product_type_id === ProductType.P ?
                    this.parseFloatSum(obj.total, total.merchandise_total) : total.merchandise_total),
                commercial_discount: this.parseFloatSum(obj.discount, total.commercial_discount)
            }
        });

        return total;
    }

    static calculatePriceTax<T extends Calculator>(props: T):{ priceWithTax: number, taxAdded:number , discount: number}  {

        return {
            priceWithTax: this.getNumber((((props.price * props.taxValue) / 100) + props.price).toFixed(4)),
            taxAdded: this.getNumber(((props.price * props.taxValue) / 100).toFixed(2)),
            discount: 0
        }
    }

    static calculateInvoiceTotal (invoices: any) {
        let total: number = 0 ;
        invoices.forEach((obj: any) => {
            total = this.parseFloatSum(parseFloat((obj?.attributes?.total).replace(/,/, '.')), total);
        });

        return total;
    }

}

export default CalculatorTask;
