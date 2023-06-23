import {ProductResource} from "../interfaces/ProductResource";

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
}
