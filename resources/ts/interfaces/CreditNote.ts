import {Invoice} from "./Invoice";


export interface CreditNote extends Invoice {
    id: number | string;
    relationships: {
        safT: {
            id: number | string;
            system_entry_date: Date
        },
        user: {
            id: number | string;
            name: string;
            email: string
        },
        credit_note: {
            id: string | number;
            attributes: {
                user_id: number | string;
                invoice_number: string;
                invoice_code: string;
                invoice_type: string;
                type_of_change: string;
                date: Date;
            };
            relationships: {
                user: {
                    name: string;
                    email: string;
                }
            }
        };
        sold_products: {
            id: number | string;
            attributes: {
                name: string;
                description: number;
                sale_id: number;
                sold_quantity: number;
                sold_price: number,
                sold_price_with_tax: number,
                sold_promotional_price: number;
                sold_promotional_status: boolean | string;
                tax_value: number;
                tax_exemption_reason: string;
                tax_exemption_code: string;
                tax_type: string;
                tax_total: number;
                total: number;
            }
        }[]
    }
}

