import axios from "../api/axios";
import MessageBox from "./MessageBox";
import Preloader from "./Preloader";


async function ProductListShowID  (){
    let template = ``;
    Preloader().active();
    try {
        const response = await axios.get('products');
        let products = response.data.data.data;
        Object.keys(products).forEach((item, key) => {
            template += `
            <option value="${ products[item].id}">${products[item].attributes?.name}</option>
            `;
        });

    }catch (err){   MessageBox('Erro na busca de produtos') }

    return template;
}

export default  ProductListShowID;
