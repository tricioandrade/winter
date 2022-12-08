import {OnSaleProduct} from "../interfaces/OnSaleProduct";
import {Calculator} from "../interfaces/Calculator";




class CalculatorTrait {
    static calculateFinalPrice(onSaleProduct: Partial<OnSaleProduct>, onSaleQuantity: number, discount: number = 0): number{
        let result = 0;
        result =  Number(onSaleProduct.attributes?.price_with_tax) * Number(onSaleQuantity) - Number(discount);
        let floatResult = result.toFixed(4);

        return Number.parseFloat(floatResult);
    }

    static calculatePriceTax<T extends Calculator>(props: T):{ priceWithTax: number, taxAdded:number , discount: number}  {

        return {
            priceWithTax: +(((props.price * props.taxValue) / 100) + props.price).toFixed(4),
            taxAdded: +((props.price * props.taxValue) / 100).toFixed(2),
            discount: 0
        }
    }
}

export default CalculatorTrait;
