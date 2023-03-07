import Preloader from "./Preloader";
import axios from "../api/axios";
import MessageBox from "./MessageBox";

export const LoadInvoices = async (callback: (invoices: any[]) => void) => {
    Preloader.active();
    try {
        const { data } =  await axios.get('sales/invoices');
        callback(data.data);
        console.log(data);
        Preloader.inactive();
    }catch (e) {
        console.log(e);
        MessageBox.open('Não foi possível buscar as facturas');
        Preloader.inactive();
    }
}


