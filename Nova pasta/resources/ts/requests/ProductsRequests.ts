import axios from "../api/axios";
// @ts-ignore
import qs from 'qs';
class ProductsRequests {

    static async saveProduct (data: string | object) {
        return await axios.post('product', data)
    }

    static async getAllProducts () {
        return await axios.get('product')
    }

    static async getSingleProduct (id: number) {
        return await axios.get('product/' + id)
    }

    static async getProductByName (name: string) {
        return await axios.get('product/name/' + name)
    }

    static async updateProduct(id: number, data: object | object[] | string) {
        return await axios({ url: 'product/' + id, method: 'patch', data: qs.stringify(data),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                }
        });
    }

    static async deleteProduct (id: number) {
        return await axios.delete('product/' + id);
    }
}

export default ProductsRequests;
