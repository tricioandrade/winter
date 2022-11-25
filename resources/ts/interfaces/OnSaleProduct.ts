import {StockProduct} from "./StockProduct";

export interface OnSaleProduct extends StockProduct{
    discount: number;
    on_sale_quantity: number;
    price_total: number;
    total_tax_value: number;
}
