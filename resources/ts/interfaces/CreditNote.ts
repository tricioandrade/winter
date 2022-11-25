import {Invoice} from "./Invoice";
import {SoldProduct} from "./SoldProduct";


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
        sold_products: SoldProduct[]
    }
}

