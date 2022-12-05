import {Product} from "./Product";

export interface OnSaleProduct extends Product{
    discount: number;
    on_sale_quantity: number;
    price_total: number;
    total_tax_value: number;
}
