import React from "react";
import { ProductResource } from "../interfaces/ProductResource";

export default class ProductList{
    data: ProductResource & ProductResource[] & any[];

    constructor(props: any){
        this.data = { ...props};
        return this;
    }

    public listOfProducts = (listBy: string = 'id') => {
        if (!this.data?.length) return ;
        return !this.data?.map((item: ProductResource, key: number) => {
            return <option key={key} value={
                listBy === 'id'
                    ? item.id : (listBy === 'name'
                        ?  item.attributes.name : item.attributes.code)
            }>{item.attributes.name}</option>;
        });
    }

    public tableRowsOfProducts = () => {
        if (!this.data?.length) return ;
        return !this.data?.map((item: any, key: number) => {
            return (
                <tr key={key}>
                    <td>{item.name}</td>
                    <td>{parseFloat(item.price_with_tax).toFixed(2)}</td>
                    <td>{item.sold_quantity}</td>
                    <td>{item.tax_value}%</td>
                    <td>{item.discount}%</td>
                    <td>{parseFloat(item.total).toFixed(2)} Kz</td>
                </tr>
            );
        });
    }
}