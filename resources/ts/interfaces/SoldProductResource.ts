export interface SoldProduct {
    id: number | string;
    attributes: {
        name: string;
        description: number;
        sale_id: number;
        product_id: number;
        code: number;
        sold_quantity: number;
        price: number,
        price_with_tax: number,
        promotional_price: number;
        promotional_status: boolean | string;
        discount: number;
        sold_tax_value: number;
        tax_exemption_reason: string;
        tax_exemption_code: string;
        tax_type: string;
        tax_total: number;
        sold_total: number;
    };
    relationships: {
        // user: {
        //     name: string;
        //     email: string;
        // };
        product: {
            name: string;
            // user_id: number;
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
