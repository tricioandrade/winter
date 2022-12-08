import axios from "../api/axios";

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

    static async updateProduct(id: number,data: object | object[] | string, token: string = '') {
        return await axios({ url: 'product/' + id, method: 'patch', data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                    '_token: ': token
                }
        });
    }

    static async deleteProduct (id: number) {
        return await axios.delete('product/' + id);
    }
}

export default ProductsRequests;
