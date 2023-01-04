import {DocTypes} from "../enums/DocTypes";

export interface Invoice {
    currency: string;
    exchange: number;
    customer: string;
    paid_value: number;
    change: number;
    payment_mechanism: string;
    payment_way: number;
    invoice_type_id: DocTypes;
    merchandise_total: number;
    commercial_discount: number;
    service_total: number;
    tax_total: number;
    total: number;
}
