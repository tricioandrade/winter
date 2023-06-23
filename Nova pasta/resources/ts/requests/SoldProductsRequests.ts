import axios from "../api/axios";

class SoldProductRequests {

    static async getAllProducts () {
        return await axios.get('sold_products')
    }

    static async getSingleProduct (id: number) {
        return await axios.get('sold_products/' + id)
    }
}

export default SoldProductRequests;
