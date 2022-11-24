import axios from "../api/axios";

class SoldProductRequets {

    static async getAllProducts () {
        return await axios.get('sold_products')
    }

    static async getSingleProduct (id: number) {
        return await axios.get('sold_products/' + id)
    }

    // static async updateProduct(id: number,data: object | object[] | string, token: string = '') {
    //     return await axios({ url: 'products/' + id, method: 'patch', data: JSON.stringify(data),
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    //             '_token: ': token
    //         }
    //     });
    // }

    // static async deleteProduct (id: number) {
    //     return await axios.delete('products/' + id);
    // }
}

export default SoldProductRequets;
