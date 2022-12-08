import {Product} from "../interfaces/Product";


function ListOfProducts  (products: any){
    let template: any;
    console.log(products);
    if (!products.length) return ;

    products.forEach((item: Product, key: number) => {
        console.log(item);
        template += `<option key=${key} value=${item.attributes.code}>${item.attributes.name}</option>`;
    });

    return (template);
}

export default  ListOfProducts;
