import {SoldProduct} from "./SoldProduct";

export interface Invoice {
    currency: string;
    exchange: number;
    customer: string;
    paid_value: number;
    change: number;
    payment_mechanism: number;
    payment_way: number;
    invoice_type_id: number;
    merchandise_total: number;
    commercial_discount: number;
    service_total: number;
    tax_total: number;
    total: number;
    products: SoldProduct[]
}
