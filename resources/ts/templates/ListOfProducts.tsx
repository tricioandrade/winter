import {ProductResource} from "../interfaces/ProductResource";
import React from "react";


const ListOfProducts = (products: ProductResource[], listBy: string = 'id') => {
    console.log(products);
    if (!products.length) return ;
    return products.map((item: ProductResource, key: number) => {
        return <option key={key} value={
            listBy === 'id'
                ? item.id : (listBy === 'name'
                    ?  item.attributes.name : item.attributes.code)
        }>{item.attributes.name}</option>;
    });
}
export default  ListOfProducts;
