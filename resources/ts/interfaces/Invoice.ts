export interface Invoice {
    currency: string;
    exchange: number;
    customer: number;
    paid_value: number;
    change: number;
    payment_mechanism: number;
    payment_way: number;
    invoice_type_id: number;
    invoice_number: number;
    merchandise_total: number;
    commercial_discount: number;
    service_total: number;
    tax_total: number;
    total: number;
    products: object[]
}
