import Preloader from "./Preloader";
import axios from "../api/axios";
import MessageBox from "./MessageBox";
import {ProductResource} from "../interfaces/ProductResource";

export const loadProducts = async (callback: (products: ProductResource[]) => void, status: string = '*') => {
    Preloader.active();
    try {
        const { data } = status === 'sale' ?  await axios.get('/products/for_sale') :  await axios.get('/product');
        callback(data.data);
        Preloader.inactive();
    }catch (e) {
        console.log(e);
        MessageBox.open('Não foi possível buscar produtos');
        Preloader.inactive();
    }
}


