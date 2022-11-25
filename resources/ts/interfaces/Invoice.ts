


export interface Invoice {
    id: number | string;
    attributes: {
        user_id: number;
        invoice_number: string;
        invoice_status: string;
        invoice_document_code: string;
        invoice_type: string;
        currency: string;
        exchange: number;
        customer: string | number;
        paid_value: number;
        payment_condition: string;
        payment_method: string;
        day: number;
        month_period: number;
        date: string;
        year: number;
        expiration_date: string;
        change: number;
        merchandise_total: number;
        commercial_discount: number;
        financial_discount: number;
        postage: number;
        service_total: number;
        tax_total: number;
        advance: number;
        eco_value: number;
        hit: number;
        total: number;
        short_hash: string;
    };
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
