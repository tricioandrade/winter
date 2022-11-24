import {ProductsForSale} from "../interfaces/ProductsForSale";
import MessageBox from "../components/MessageBox";




class ProductCalculator {
    static calculateFinalPrice(product: Partial<ProductsForSale>, onSaleQuantity: number, discount: number = 0): number{
        let result = 0;
        // @ts-ignore
        if ((product.stockQuantity < onSaleQuantity)) {
            MessageBox.openModal('A quantidade total é menor que a existente em stock!');
            return 0;
        }
        result =  Number(product.stockQuantity) + Number(onSaleQuantity) - Number(discount);
        let floatResult = result.toFixed(4);

        return Number.parseFloat(floatResult);
    }
}

export default ProductCalculator;
