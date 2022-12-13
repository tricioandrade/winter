export interface Product {
    name: string;
    description: string;
    code: string;
    stock_quantity: number ;
    unity_quantity: number;
    for_sale_quantity: number;
    for_sale_status: number;
    unity_of_measure: string;
    price: number;
    product_type_id: number;
    price_with_tax: number,
    promotional_price?: number;
    promotional_status?: number,
    tax_id: number;
    tax_value: number;
    tax_total_added: number;
    tax_exemption_code: string;
    tax_exemption_reason: string;

}
