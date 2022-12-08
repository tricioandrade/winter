import {Product} from "./Product";

export interface Inventory {
    page: boolean
    taxValue: number
    price: number
    priceWithTax: number
    taxAdded: number
    products: Product[]
}