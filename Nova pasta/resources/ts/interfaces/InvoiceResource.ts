import {SoldProduct} from "./SoldProduct";


export interface InvoiceResource {
    id: number | string;
    attributes: {
        currency: number;
        exchange: number;
        customer: string;
        paid_value: string;
        change: string;
        payment_mechanism: string;
        payment_way: string;
        invoice_status: string;
        invoice_type_id: number;
        invoice_number: string;
        day: number;
        month: number;
        date: string;
        expiration_date: string;
        system_entry_date: string;
        merchandise_total: string;
        commercial_discount: string;
        financial_discount: string;
        postage: string;
        service_total: string;
        tax_total: string;
        advance: string;
        eco_value: string;
        hit: string;
        total: string;
        short_hash: string;
        created_at: string;
        updated_at: string;
    };
    relationships: {
        user: UserResource;
        invoice: [
            name: string,
            data: []
        ],
        products: [],

    }
}
