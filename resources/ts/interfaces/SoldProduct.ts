
export interface SoldProduct {
    code: string | number;
    description: string;
    discount: number;
    for_sale_quantity: number;
    for_sale_status: number;
    name: string;
    price: number;
    price_with_tax: number;
    product_id: number;
    product_type_name: string;
    product_type_symbol: string;
    promotional_price: string;
    promotional_status: string;
    sold_quantity: number;
    stock_quantity: number;
    tax_exemption_code: string;
    tax_exemption_reason: string;
    tax_total: number;
    tax_total_added: number;
    tax_type: string;
    tax_value: number;
    total: number;
    unity_of_measure: string;
    unity_quantity: number;
}
