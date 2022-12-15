import Preloader from "./Preloader";
import axios from "../api/axios";
import MessageBox from "./MessageBox";
import {ProductResource} from "../interfaces/ProductResource";

export const loadProducts = async (callback: (products: ProductResource[]) => void ) => {
    Preloader.active();
    try {
        const { data } = await axios.get('/product');
        callback(data.data);
        Preloader.inactive();
    }catch (e) {
        MessageBox.open('Não foi possível buscar produtos');
        Preloader.inactive();
    }
}


