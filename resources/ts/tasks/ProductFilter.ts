import {Product} from "../interfaces/Product";

export const queryProduct = (ref: string | number, products: Product[], key: string = 'name'): Product[] => {
    return products.filter((obj: Product) => {
        switch (key) {
            case 'id'  : return obj.id === ref;
            case 'code': return obj.attributes.code === ref;
            case 'name': return obj.attributes.name === ref;
            default:
                return obj.attributes.name === ref;
        }
    });
}
