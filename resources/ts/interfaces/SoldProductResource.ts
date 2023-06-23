import { SoldProduct } from "./SoldProduct";
import { UserResource } from "./UserResource";

export interface SoldProductResource {
    id: number | string;
    attributes: SoldProduct;

    money_format: {
        price: string;
        price_with_tax: string;
        tax_total: string;
        total: string;      
    };

    relationships: {
        user: UserResource;
        product: {
            name: string;
            description: string;
        };
    }
}
