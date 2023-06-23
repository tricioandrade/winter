import axios from "../api/axios";

class SaleRequests {
    static async saveInvoice (data: object) {
        return await axios.post('sales', data);
    }
}

export default SaleRequests;
