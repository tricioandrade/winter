import { UserResource } from "./UserResource";

export interface SoldProductResource {
    id: number | string;
    attributes: { 
        name: string;
        description: string;
        sale_id: number;
        product_id: number;
        price: string;
        price_with_tax: string;
        promotional_price: string;
        promotional_status: number;
        product_type_symbol: string;
        product_type_name: string;
        sold_quantity: string;
        discount: string;
        tax_value: number;
        tax_type: string;
        tax_total: number;
        total: string;
        tax_exemption_code: string;
        tax_exemption_reason: string;
    };
    relationships: {
        user: UserResource;
        product: {
            name: string;
            description: string;
        };
    }
}
