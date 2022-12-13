import {Calculator} from "../interfaces/Calculator";


class CalculatorTask {
    static calculateFinalPrice(priceWithTax: number, onSaleQuantity: number, discount: number = 0): number{
        let result = 0;
        result =  (priceWithTax * onSaleQuantity ) - discount;
        let floatResult = result.toFixed(4);

        return Number.parseFloat(floatResult);
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
