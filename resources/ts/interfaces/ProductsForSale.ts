import {Product} from "./Product";

export interface ProductsForSale extends Product{
    discount: number;
    onSaleQuantity: number;
    priceTotal: number;
    totalTaxValue: number;
}
