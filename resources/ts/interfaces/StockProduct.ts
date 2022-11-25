export interface StockProduct {
    id: number | string;
    attributes: {
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
    };
    relationships: {
        tax_types: {
            id: string | number;
            name: string;
            description: string;
            symbol: string;
        };
        tax_exemption: {
            id: string | number;
            code: string;
            reason: string;
        }
        user: {
            name: string;
            email: string;
        }
    }
}
