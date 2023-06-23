import {ProductResource} from "../interfaces/ProductResource";
import { SoldProductResource } from "../interfaces/SoldProductResource";

export const queryProduct = (ref: string | number, products: ProductResource[], key: string = 'name'): ProductResource[] => {
    return products.filter((obj: ProductResource) => {
        switch (key) {
            case 'id'  : return obj.id === ref;
            case 'code': return obj.attributes.code === ref;
            case 'name': return obj.attributes.name === ref;
            default:
                return obj.attributes.name === ref;
        }
    });
};

export const querySoldProduct = (ref: string | number, products: SoldProductResource[], key: string = 'id'): SoldProductResource[] => {
    return products.filter((obj: SoldProductResource) => {
        
        switch (key) {
            case 'id'  : console.log('filter: Y', obj); return obj.id === ref;
            case 'name': return obj.attributes.name === ref;
            default:
                return obj.attributes.name === ref;
        }
    });
};
