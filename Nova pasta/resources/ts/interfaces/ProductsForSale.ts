import {ProductResource} from "./ProductResource";

export interface ProductsForSale extends ProductResource{
    discount: number;
    onSaleQuantity: number;
    priceTotal: number;
    totalTaxValue: number;
}
