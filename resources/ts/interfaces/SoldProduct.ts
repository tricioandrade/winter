



export interface SoldProduct {
    id: number | string;
    attributes: {
        name: string;
        description: number;
        sale_id: number;
        product_id: number;
        sold_product_code: number;
        sold_quantity: number;
        sold_price: number,
        sold_price_with_tax: number,
        sold_promotional_price: number;
        sold_promotional_status: boolean | string;
        sold_discount: number;
        sold_tax_value: number;
        sold_tax_exemption_reason: string;
        sold_tax_exemption_code: string;
        sold_tax_type: string;
        sold_tax_total: number;
        sold_total: number;
    };
    relationships: {
        user: {
            name: string;
            email: string;
        };
        product: {
            name: string;
            user_id: number;
            description: number;
            code: number | string;
            stock_quantity: number;
            unity_quantity: number;
            for_sale_quantity: number;
            for_sale_status: string | boolean;
            unity_of_measure: string | number;
            price: number,
            price_with_tax: number,
            promotional_price: number;
            promotional_status: boolean | string;
            tax_type_id: number;
            tax_value: number;
            tax_total: number;
            tax_exemption_id: number;
        }
    }
}
