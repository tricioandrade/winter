import {ProductResource} from "./ProductResource";

export interface Inventory {
    page: boolean
    taxValue: number
    price: number
    priceWithTax: number
    taxAdded: number
    products: ProductResource[]
}
