import axios from "../api/axios";
import MessageBox from "./MessageBox";
import Preloader from "./Preloader";


async function ProductList  (){
    let template = ``;
    Preloader().active();
    try {
        const response = await axios.get('products');
        let products = response.data.data.data;
        Object.keys(products).forEach((item, key) => {
            template += `
            <option accesskey="${products[item].id}" value="${ products[item]?.attributes?.ref_code ?? products[item].attributes?.generated_code}">${products[item].attributes?.name}</option>
            `;
        });

    }catch (err){   MessageBox('Erro na busca de produtos') }

    return template;
}

export default  ProductList;
