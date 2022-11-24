import axios from "../api/axios";

class UsersRequests {

    static async saveUser (data: string | object) {
        return await axios.post('user', data);
    }

    static async getAllUsers () {
        return await axios.get('user');
    }

    static async getSingleUser (id: number) {
        return await axios.get('user/' + id);
    }

    static async updateUser(id: number,data: object | object[] | string, token: string = '') {
        return await axios({ url: 'user/' + id, method: 'patch', data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                '_token: ': token
            }
        });
    }

    static async deleteUser (id: number) {
        return await axios.delete('user/' + id);
    }
}

export default UsersRequests;
