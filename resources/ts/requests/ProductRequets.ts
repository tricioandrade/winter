import axios from "../api/axios";

class ProductRequets {
    static async getAllProducts () {
        return await axios.get('product')
    }

    static async getSingleProduct (id: number) {
        return await axios.get('products/' + id)
    }

}

export default ProductRequets;
