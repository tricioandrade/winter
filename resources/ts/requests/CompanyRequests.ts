import axios from "../api/axios";

class CompanyRequests {

    static async saveCompany (data: string | object) {
        return await axios.post('company', data);
    }

    static async getAllCompanies () {
        return await axios.get('company');
    }

    static async getSingleCompany (id: number) {
        return await axios.get('company/' + id);
    }

    static async updateCompany(id: number,data: object | object[] | string, token: string = '') {
        return await axios({ url: 'company/' + id, method: 'patch', data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                '_token: ': token
            }
        });
    }

    // static async deleteCompany (id: number) {
    //     return await axios.delete('company/' + id);
    // }
}

export default CompanyRequests;
