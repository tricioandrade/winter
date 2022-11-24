export interface Product{
    id: number;
    uniqueID: string | number;
    name: string;
    description: string;
    stockQuantity: number;
    forSaleState: boolean;
    forSaleQuantity: number;
    unityQuantity: number;
    unityOfMeasure: string;
    price: number;
    priceWithTax: number;
    taxAdded: number;
    taxValue: number;
    taxType: number;
    taxReason: string;
    storeIDNumber: number;
}
