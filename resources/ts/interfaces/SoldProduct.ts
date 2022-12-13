

export interface SoldProduct {
    product_id: number;
    product_type_symbol: string;
    product_type_name: string;
    sold_quantity: number;
    discount: number;
    tax_type: string;
    tax_total: number;
    total: number;
}
