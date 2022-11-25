import MessageBox from "../components/MessageBox";
import {OnSaleProduct} from "../interfaces/OnSaleProduct";




class ProductCalculator {
    static calculateFinalPrice(onSaleProduct: Partial<OnSaleProduct>, onSaleQuantity: number, discount: number = 0): number{
        let result = 0;
        // @ts-ignore
        if ((onSaleProduct.on_sale_quantity < onSaleQuantity)) {
            MessageBox.openModal('A quantidade total é menor que a existente em stock!');
            return 0;
        }
        result =  Number(onSaleProduct.attributes?.stock_quantity) + Number(onSaleQuantity) - Number(discount);
        let floatResult = result.toFixed(4);

        return Number.parseFloat(floatResult);
    }
}

export default ProductCalculator;
